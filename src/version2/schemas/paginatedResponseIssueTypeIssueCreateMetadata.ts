import { z } from 'zod';
import { IssueTypeIssueCreateMetadataSchema } from './issueTypeIssueCreateMetadata';

export const PaginatedResponseIssueTypeIssueCreateMetadataSchema = z.object({
  maxResults: z.number().int().optional(),
  results: z.array(IssueTypeIssueCreateMetadataSchema).optional(),
  startAt: z.number().int().optional(),
  total: z.number().int().optional(),
});

export type PaginatedResponseIssueTypeIssueCreateMetadata = z.infer<
  typeof PaginatedResponseIssueTypeIssueCreateMetadataSchema
>;
