import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/**
 * A document in [Atlassian Document
 * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
 */

export const DocumentSchema = apiObject({
  type: openEnum(['doc']),
  version: z.number(),
  content: z.array(z.record(z.string(), z.any())),
});

export type Document = z.infer<typeof DocumentSchema>;
