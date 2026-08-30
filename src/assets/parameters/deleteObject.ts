import { z } from 'zod';

export const DeleteObjectSchema = z.object({
  /** The object id to operate on */
  id: z.string(),
});

export type DeleteObject = z.input<typeof DeleteObjectSchema>;
