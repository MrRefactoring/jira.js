import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeIssueCreateMetadataSchema } from './issueTypeIssueCreateMetadata';

export const PaginatedResponseIssueTypeIssueCreateMetadataSchema = apiObject({
  maxResults: z.number().optional(),
  results: z.array(IssueTypeIssueCreateMetadataSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PaginatedResponseIssueTypeIssueCreateMetadata = z.infer<
  typeof PaginatedResponseIssueTypeIssueCreateMetadataSchema
>;
