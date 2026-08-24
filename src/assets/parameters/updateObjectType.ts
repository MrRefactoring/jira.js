import { z } from 'zod';
import { ObjectTypeUpdateSchema } from '../models';

export const UpdateObjectTypeSchema = z.object(ObjectTypeUpdateSchema.shape).extend({
  id: z.string(),
});

export type UpdateObjectType = z.input<typeof UpdateObjectTypeSchema>;
