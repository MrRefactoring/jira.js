import { z } from 'zod';
import { FieldCreateMetadataSchema } from '#/models/fieldCreateMetadata';

/** A page of CreateMetaIssueType with Field. */
export const PageOfCreateMetaIssueTypeWithFieldSchema = z.object({
  /** The collection of FieldCreateMetaBeans. */
  fields: z.array(FieldCreateMetadataSchema).optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  results: z.array(FieldCreateMetadataSchema).optional(),
  /** The index of the first item returned. */
  startAt: z.number().optional(),
  /** The total number of items in all pages. */
  total: z.number().optional(),
});

export type PageOfCreateMetaIssueTypeWithField = z.infer<typeof PageOfCreateMetaIssueTypeWithFieldSchema>;
