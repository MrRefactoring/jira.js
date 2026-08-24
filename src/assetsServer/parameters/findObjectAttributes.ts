import { z } from 'zod';

export const FindObjectAttributesSchema = z.object({
  /** The ID or object key of the object to load. */
  id: z.string(),
});

export type FindObjectAttributes = z.input<typeof FindObjectAttributesSchema>;
