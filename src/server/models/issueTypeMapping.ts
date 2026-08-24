import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueTypeMappingSchema = apiObject({
  issueType: z.string().optional(),
  updateDraftIfNeeded: z.boolean().optional(),
  workflow: z.string().optional(),
});

export type IssueTypeMapping = z.infer<typeof IssueTypeMappingSchema>;
