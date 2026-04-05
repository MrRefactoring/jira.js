import type { Client } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { createAgileClient } from '#/createAgileClient';
import { createLiveBaseClient } from './helpers/liveBaseClient';
import { getLiveEnv } from './helpers/liveEnv';
import {
  deleteOwnedLiveProject,
  resolveLiveTestProject,
  type ResolvedLiveProject,
} from './helpers/resolveLiveTestProject';

const oauthToken = process.env.JIRA_OAUTH_TOKEN;
const cloudId = process.env.JIRA_CLOUD_ID;

const IssueCreatedSchema = z.object({
  id: z.string(),
  key: z.string(),
});

async function createTestIssue(http: Client, projectKey: string): Promise<{ id: string; key: string }> {
  return http.sendRequest({
    url: '/rest/api/3/issue',
    method: 'POST',
    body: {
      fields: {
        project: { key: projectKey },
        summary: `sdk-live-ff-issue-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        issuetype: { name: 'Task' },
      },
    },
    schema: IssueCreatedSchema,
  });
}

// All featureFlags endpoints require OAuth 2.0 Bearer token — see knowledge/OAuth 2.0 Live Test Workflow.md
describe('featureFlags — live', () => {
  describe.skipIf(!oauthToken || !cloudId)('submitFeatureFlags', () => {
    const agile = createAgileClient({
      host: `https://api.atlassian.com/ex/jira/${cloudId}`,
      auth: { type: 'bearer', token: oauthToken! },
    });

    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let issue: { id: string; key: string };
    let flagId: string;

    beforeAll(async () => {
      const env = getLiveEnv();

      if (!env) throw new Error('Set JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN to run live tests.');

      http = createLiveBaseClient(env);
      resolvedProject = await resolveLiveTestProject(http, env);

      try {
        issue = await createTestIssue(http, resolvedProject.projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      flagId = `sdk-live-flag-${Date.now()}`;
    }, 60_000);

    afterAll(async () => {
      await agile.featureFlags.deleteFeatureFlagById({ featureFlagId: flagId }).catch(() => {});

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, 60_000);

    it('accepts a valid flag and returns it in acceptedFeatureFlags', async () => {
      const now = new Date().toISOString();

      const result = await agile.featureFlags.submitFeatureFlags({
        flags: [
          {
            id: flagId,
            key: flagId,
            updateSequenceId: Date.now(),
            displayName: 'SDK live test flag',
            summary: {
              status: { enabled: true },
              lastUpdated: now,
            },
            details: [
              {
                url: 'https://example.com/flags/sdk-live',
                lastUpdated: now,
                environment: { name: 'production', type: 'production' },
                status: { enabled: true },
              },
            ],
            associations: [
              {
                associationType: 'issueIdOrKeys',
                values: [issue.key],
              },
            ],
          },
        ],
      });

      expect(result.acceptedFeatureFlags).toContain(flagId);
      expect(result.failedFeatureFlags ?? {}).not.toHaveProperty(flagId);
    });

    it('returns unknownIssueKeys for a nonexistent issue key in associations', async () => {
      const now = new Date().toISOString();
      const unknownFlagId = `${flagId}-unknown`;

      const result = await agile.featureFlags.submitFeatureFlags({
        flags: [
          {
            id: unknownFlagId,
            key: unknownFlagId,
            updateSequenceId: Date.now(),
            summary: {
              status: { enabled: false },
              lastUpdated: now,
            },
            details: [
              {
                url: 'https://example.com/flags/sdk-live-unknown',
                lastUpdated: now,
                environment: { name: 'staging', type: 'staging' },
                status: { enabled: false },
              },
            ],
            associations: [
              {
                associationType: 'issueIdOrKeys',
                values: ['INVALID-99999'],
              },
            ],
          },
        ],
      });

      expect(result.unknownIssueKeys).toContain('INVALID-99999');
    });

    it('updates an existing flag when updateSequenceId is higher', async () => {
      const now = new Date().toISOString();

      const result = await agile.featureFlags.submitFeatureFlags({
        flags: [
          {
            id: flagId,
            key: flagId,
            updateSequenceId: Date.now() + 1,
            displayName: 'SDK live test flag — updated',
            summary: {
              status: { enabled: false },
              lastUpdated: now,
            },
            details: [
              {
                url: 'https://example.com/flags/sdk-live',
                lastUpdated: now,
                environment: { name: 'production', type: 'production' },
                status: { enabled: false },
              },
            ],
            associations: [
              {
                associationType: 'issueIdOrKeys',
                values: [issue.key],
              },
            ],
          },
        ],
      });

      expect(result.acceptedFeatureFlags).toContain(flagId);
    });

    it('attaches providerMetadata without affecting acceptance', async () => {
      const now = new Date().toISOString();
      const metaFlagId = `${flagId}-meta`;

      const result = await agile.featureFlags.submitFeatureFlags({
        flags: [
          {
            id: metaFlagId,
            key: metaFlagId,
            updateSequenceId: Date.now(),
            summary: {
              status: { enabled: true },
              lastUpdated: now,
            },
            details: [
              {
                url: 'https://example.com/flags/sdk-live-meta',
                lastUpdated: now,
                environment: { name: 'production', type: 'production' },
                status: { enabled: true },
              },
            ],
            associations: [
              {
                associationType: 'issueIdOrKeys',
                values: [issue.key],
              },
            ],
          },
        ],
        providerMetadata: { product: 'sdk-live-test' },
      });

      expect(result.acceptedFeatureFlags).toContain(metaFlagId);

      await agile.featureFlags.deleteFeatureFlagById({ featureFlagId: metaFlagId }).catch(() => {});
    });
  });

  describe.skip('getFeatureFlagById', () => {
    it.todo('retrieves a previously submitted feature flag by id');
    it.todo('throws ApiError for a nonexistent feature flag id');
  });

  describe.skip('deleteFeatureFlagById', () => {
    it.todo('deletes a submitted feature flag without error');
    it.todo('throws ApiError for a nonexistent feature flag id');
  });

  describe.skip('deleteFeatureFlagsByProperty', () => {
    it.todo('deletes all feature flags matching the given properties');
  });
});
