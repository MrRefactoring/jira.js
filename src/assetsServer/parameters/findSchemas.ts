import { z } from 'zod';

export const FindSchemasSchema = z.object({
  xoauth_requestor_id: z.string().optional(),
  /** Query to filter on available object schemas */
  query: z.string().optional(),
});

export type FindSchemas = z.input<typeof FindSchemasSchema>;
