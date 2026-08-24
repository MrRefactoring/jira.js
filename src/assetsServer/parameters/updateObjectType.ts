import { z } from 'zod';
import { ObjectTypeInSchema } from '../models';

export const UpdateObjectTypeSchema = z.object({
  /** The ID of the object type to update. */
  id: z.string(),
  body: ObjectTypeInSchema.optional(),
});

export type UpdateObjectType = z.input<typeof UpdateObjectTypeSchema>;
