import { z } from 'zod';

export const FindObjectReferenceInfoSchema = z.object({
  /** The object id to operate on */
  id: z.string(),
});

export type FindObjectReferenceInfo = z.input<typeof FindObjectReferenceInfoSchema>;
