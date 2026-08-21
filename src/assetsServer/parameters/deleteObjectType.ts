import { z } from 'zod';

export const DeleteObjectTypeSchema = z.object({
  /** The ID of the object type to delete. */
  id: z.string(),
});

export type DeleteObjectType = z.input<typeof DeleteObjectTypeSchema>;
