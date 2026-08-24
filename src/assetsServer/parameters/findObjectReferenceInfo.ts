import { z } from 'zod';

export const FindObjectReferenceInfoSchema = z.object({
  /** The ID or object key of the object to load. */
  id: z.string(),
});

export type FindObjectReferenceInfo = z.input<typeof FindObjectReferenceInfoSchema>;
