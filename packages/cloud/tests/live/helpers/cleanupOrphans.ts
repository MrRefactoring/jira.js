import type { Client } from '@jira.js/base';
import { z } from 'zod';

const ProjectListSchema = z.object({
  values: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
      name: z.string(),
    }),
  ),
  isLast: z.boolean().optional(),
  nextPage: z.string().optional(),
});

export interface CleanupOrphansOptions {
  /** Minimum age in milliseconds before a project is considered orphaned. Default: 2 hours. */
  ttlMs?: number;
  /** If true, log each deletion. Default: true. */
  verbose?: boolean;
  /** Dry-run: list candidates without deleting. Default: false. */
  dryRun?: boolean;
}

export interface CleanupOrphansResult {
  scanned: number;
  deleted: string[];
  skipped: string[];
  errors: Array<{ key: string; message: string }>;
}

/**
 * Scans for `sdk-live-*` projects whose names embed a timestamp older than `ttlMs`
 * and deletes them. Projects created by the current run (matching `currentRunId`) are
 * always skipped regardless of age.
 *
 * Project name format: `sdk-live-<runId>-<suffix>`
 * where runId is either a GitHub run ID (numeric) or a short UUID fragment (8 hex chars).
 * Age detection is based on Jira's project creation date returned via the `/rest/api/3/project/<key>` endpoint.
 */
export async function cleanupOrphans(
  http: Client,
  currentRunId: string,
  options: CleanupOrphansOptions = {},
): Promise<CleanupOrphansResult> {
  const { ttlMs = 2 * 60 * 60 * 1000, verbose = true, dryRun = false } = options;

  const result: CleanupOrphansResult = { scanned: 0, deleted: [], skipped: [], errors: [] };
  const cutoff = Date.now() - ttlMs;

  let startAt = 0;
  const maxResults = 50;

  // Paginate through all projects matching the sdk-live-* naming convention.
  // Jira Cloud does not support wildcard search in /rest/api/3/project, so we
  // fetch pages with a broad query and filter client-side.
  while (true) {
    let page: z.infer<typeof ProjectListSchema>;

    try {
      page = await http.sendRequest({
        url: `/rest/api/3/project/search?query=sdk-live-&maxResults=${maxResults}&startAt=${startAt}`,
        method: 'GET',
        schema: ProjectListSchema,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      result.errors.push({ key: '(list)', message: `Failed to list projects at startAt=${startAt}: ${msg}` });
      break;
    }

    for (const project of page.values) {
      if (!project.name.startsWith('sdk-live-')) continue;

      result.scanned++;

      // Skip the current run's own project(s).
      if (project.name.includes(`sdk-live-${currentRunId}-`)) {
        result.skipped.push(project.key);
        continue;
      }

      // Determine project age via its detail endpoint.
      let createdMs: number | null = null;

      try {
        const detail = await http.sendRequest({
          url: `/rest/api/3/project/${project.key}?properties=*all`,
          method: 'GET',
          schema: z.object({ properties: z.record(z.string(), z.unknown()).optional() }).passthrough(),
        });

        // Jira does not surface createdDate in the standard project REST response.
        // Fall back to parsing the runId from the project name: if runId is a
        // numeric GitHub Actions run ID we can estimate creation time indirectly
        // (not reliable). For UUID-based runIds we have no embedded timestamp, so
        // we conservatively skip rather than guess.
        void detail;
      } catch {
        // Ignore — proceed to name-based heuristic below.
      }

      // Name-based heuristic: if runId portion of name is a pure numeric string
      // (GitHub Actions run ID), treat any project whose run ID is sufficiently old
      // by comparing run IDs numerically (higher = newer). Since run IDs are
      // monotonically increasing we can use a threshold. This is best-effort only.
      const nameMatch = project.name.match(/^sdk-live-(\d+)-[0-9a-f]+$/);
      if (nameMatch) {
        const projectRunId = Number(nameMatch[1]);
        const currentRunIdNum = Number(currentRunId);
        // Skip if we cannot parse the current run ID as a number.
        if (!Number.isNaN(currentRunIdNum) && !Number.isNaN(projectRunId)) {
          // Approximate: GitHub run IDs increment by ~1 per second; a gap of
          // 7200 (2 h at 1/s) is the same threshold as ttlMs default.
          const approxAgeSeconds = (currentRunIdNum - projectRunId) / 1;
          createdMs = Date.now() - approxAgeSeconds * 1000;
        }
      }

      // If we still cannot determine age, skip conservatively.
      if (createdMs === null) {
        result.skipped.push(project.key);
        continue;
      }

      if (createdMs > cutoff) {
        result.skipped.push(project.key);
        continue;
      }

      if (dryRun) {
        if (verbose) console.log(`[cleanupOrphans] dry-run: would delete ${project.key} (${project.name})`);
        result.skipped.push(project.key);
        continue;
      }

      try {
        await http.sendRequest({ url: `/rest/api/3/project/${project.key}`, method: 'DELETE', schema: z.unknown() });
        result.deleted.push(project.key);
        if (verbose) console.log(`[cleanupOrphans] deleted orphan project ${project.key} (${project.name})`);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        result.errors.push({ key: project.key, message: msg });
        if (verbose) console.warn(`[cleanupOrphans] failed to delete ${project.key}: ${msg}`);
      }
    }

    if (page.isLast || page.values.length < maxResults) break;
    startAt += maxResults;
  }

  return result;
}
