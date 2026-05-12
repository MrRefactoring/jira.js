import { z } from 'zod';
import { IssueTypeIssueCreateMetadataSchema } from '#/models/issueTypeIssueCreateMetadata';

/** A page of CreateMetaIssueTypes. */
export const PageOfCreateMetaIssueTypesSchema = z.object({
  createMetaIssueType: z.array(IssueTypeIssueCreateMetadataSchema).optional(),
  /** The list of CreateMetaIssueType. */
  issueTypes: z.array(IssueTypeIssueCreateMetadataSchema).optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /** The index of the first item returned. */
  startAt: z.number().optional(),
  /** The total number of items in all pages. */
  total: z.number().optional(),
});

export type PageOfCreateMetaIssueTypes = z.infer<typeof PageOfCreateMetaIssueTypesSchema>;
