import { z } from 'zod';
import { FieldCreateMetadataSchema } from './fieldCreateMetadata';

/** A page of CreateMetaIssueType with Field. */
export const PageOfCreateMetaIssueTypeWithFieldSchema = z.object({
  /** The collection of FieldCreateMetaBeans. */
  fields: z.array(FieldCreateMetadataSchema).optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  results: z.array(FieldCreateMetadataSchema).optional(),
  /** The index of the first item returned. */
  startAt: z.number().int().optional(),
  /** The total number of items in all pages. */
  total: z.number().int().optional(),
});

export type PageOfCreateMetaIssueTypeWithField = z.infer<typeof PageOfCreateMetaIssueTypeWithFieldSchema>;
