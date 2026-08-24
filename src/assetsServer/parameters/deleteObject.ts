import { z } from 'zod';

export const DeleteObjectSchema = z.object({
  /** The ID or object key of the object to delete. */
  id: z.string(),
});

export type DeleteObject = z.input<typeof DeleteObjectSchema>;
