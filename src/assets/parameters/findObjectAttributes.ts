import { z } from 'zod';

export const FindObjectAttributesSchema = z.object({
  /** The object id to operate on */
  id: z.string(),
});

export type FindObjectAttributes = z.input<typeof FindObjectAttributesSchema>;
