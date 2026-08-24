import { z } from 'zod';
import { ObjectTypeAttributeInSchema } from '../models';

export const UpdateObjectTypeAttributeSchema = z.object({
  /** The ID of the object type to update the attribute for. */
  objectTypeId: z.string(),
  /** The ID of the attribute to update. */
  id: z.string(),
  body: ObjectTypeAttributeInSchema.optional(),
});

export type UpdateObjectTypeAttribute = z.input<typeof UpdateObjectTypeAttributeSchema>;
