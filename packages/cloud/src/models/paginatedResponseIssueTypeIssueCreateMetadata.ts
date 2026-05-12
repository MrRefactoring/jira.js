import { z } from 'zod';
import { IssueTypeIssueCreateMetadataSchema } from '#/models/issueTypeIssueCreateMetadata';

export const PaginatedResponseIssueTypeIssueCreateMetadataSchema = z.object({
  maxResults: z.number().optional(),
  results: z.array(IssueTypeIssueCreateMetadataSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PaginatedResponseIssueTypeIssueCreateMetadata = z.infer<
  typeof PaginatedResponseIssueTypeIssueCreateMetadataSchema
>;
