import { z } from 'zod';

export const DeleteObjectTypeAttributeSchema = z.object({
  /** The ID of the attribute to delete. */
  id: z.string(),
});

export type DeleteObjectTypeAttribute = z.input<typeof DeleteObjectTypeAttributeSchema>;
