import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueIndexSummarySchema = apiObject({
  countInArchive: z.number().optional(),
  countInDatabase: z.number().optional(),
  countInIndex: z.number().optional(),
  indexReadable: z.boolean().optional(),
  lastUpdatedInDatabase: z.coerce.date().optional(),
  lastUpdatedInIndex: z.coerce.date().optional(),
});

export type IssueIndexSummary = z.infer<typeof IssueIndexSummarySchema>;
