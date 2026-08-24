import { z } from 'zod';

export const FindSchemasSchema = z.object({
  /** The starting index for the next page of results */
  startAt: z.number().optional(),
  /**
   * The maximum number of objects to return in this page of results. Actual number of results may be less, for example,
   * if the last page of results is returned.
   */
  maxResults: z.number().optional(),
  /**
   * Should the object and object type count for schema be included in the response. If this parameter is false, object
   * and object type count will return 0.
   */
  includeCounts: z.boolean().optional(),
});

export type FindSchemas = z.input<typeof FindSchemasSchema>;
