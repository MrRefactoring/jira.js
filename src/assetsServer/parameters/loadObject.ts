import { z } from 'zod';

export const LoadObjectSchema = z.object({
  xoauth_requestor_id: z.string().optional(),
  /** Should the attributes be included in the response. */
  includeAttributes: z.string().optional(),
  /** The ID or object key of the object to load. */
  id: z.string(),
  /** Should the extended info be included in the response. */
  includeExtendedInfo: z.string().optional(),
});

export type LoadObject = z.input<typeof LoadObjectSchema>;
