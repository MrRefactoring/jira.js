import { z } from 'zod';

export const DeleteObjectTypeAttributeSchema = z.object({
  /** The object type attribute id to be manipulated */
  id: z.string(),
});

export type DeleteObjectTypeAttribute = z.input<typeof DeleteObjectTypeAttributeSchema>;
