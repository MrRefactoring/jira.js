import { z } from 'zod';
import { apiObject } from '#/core';

export const IndexIntegrityOutSchema = apiObject({
  objectJiraIssueIndexOk: z.boolean().optional(),
  objectSchemaIndexOk: z.boolean().optional(),
  objectTypeAttributeIndexOk: z.boolean().optional(),
  objectTypeIndexOk: z.boolean().optional(),
  objectIndexOk: z.boolean().optional(),
  reindexNeeded: z.boolean().optional(),
});

export type IndexIntegrityOut = z.infer<typeof IndexIntegrityOutSchema>;
