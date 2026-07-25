import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the `issueSecuritySchemes` API (`getIssueSecuritySchemes`, `getIssueSecurityScheme`) and the
 * neighbouring `issueSecurityLevel` reads.
 *
 * Read-only, and there is no write half in this module at all — issue security schemes are created through a
 * different, admin-only API entirely.
 *
 * Worth its own file because issue security is the one mechanism in Jira that can make an issue *invisible* rather
 * than merely read-only. Every other suite here reads issues freely; that only holds because the test project has no
 * security scheme attached, and this file is what establishes it rather than assuming it.
 */
describe('Jira Cloud — issueSecuritySchemes (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists the site security schemes, or refuses typed without admin rights', async () => {
    const result = await client.issueSecuritySchemes.getIssueSecuritySchemes().catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result) || (result as { status?: number }).status === 401).toBe(true);

      return;
    }

    const schemes = result as Awaited<ReturnType<typeof client.issueSecuritySchemes.getIssueSecuritySchemes>>;

    expect(Array.isArray(schemes.issueSecuritySchemes)).toBe(true);

    for (const scheme of schemes.issueSecuritySchemes ?? []) {
      expect(typeof scheme.id).toBe('number');
      expect(typeof scheme.name).toBe('string');
      expect(scheme.self).toMatch(/^https:\/\//);
    }
  });

  it('confirms the test project has no security scheme, which is why the rest of the suite can read', async () => {
    const scheme = await client.projectPermissionSchemes
      .getProjectIssueSecurityScheme({ projectKeyOrId: TEST_PROJECT_KEY })
      .catch((e: unknown) => e);

    expect(isNotFoundError(scheme)).toBe(true);
  });

  it('reports no security levels for a project without a scheme', async () => {
    const levels = await client.projectPermissionSchemes.getSecurityLevelsForProject({
      projectKeyOrId: TEST_PROJECT_KEY,
    });

    expect(levels.levels ?? []).toEqual([]);
  });

  it('surfaces an unknown scheme as a typed error', async () => {
    const error = await client.issueSecuritySchemes
      .getIssueSecurityScheme({ id: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });

  it('surfaces an unknown security level as a typed error', async () => {
    const error = await client.issueSecurityLevel.getIssueSecurityLevel({ id: '99999999' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });
});
