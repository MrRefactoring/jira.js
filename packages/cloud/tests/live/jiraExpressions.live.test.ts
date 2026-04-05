import { beforeAll, describe, expect, it } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';

describe('jiraExpressions — live', () => {
  let live: LiveCloudClient;

  beforeAll(() => {
    live = createLiveCloudClient();
  });

  describe('analyseExpression', () => {
    it('returns JiraExpressionsAnalysis', async () => {
      const result = await live.client.jiraExpressions.analyseExpression({
        expressions: ['issue.summary'],
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
    });
  });
});
