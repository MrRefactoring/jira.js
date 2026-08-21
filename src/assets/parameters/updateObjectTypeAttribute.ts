import { z } from 'zod';
import { ObjectTypeAttributeUpdateSchema } from '../models';

export const UpdateObjectTypeAttributeSchema = z.object(ObjectTypeAttributeUpdateSchema.shape).extend({
  /** The object type attribute to manipulate */
  id: z.string(),
  /** The object type id that has this object type attribute associated with it */
  objectTypeId: z.string(),
});

export type UpdateObjectTypeAttribute = z.input<typeof UpdateObjectTypeAttributeSchema>;
