import { z } from 'zod';
import { ObjectTypeAttributeCreateSchema } from '../models';

export const CreateObjectTypeAttributeSchema = z.object(ObjectTypeAttributeCreateSchema.shape).extend({
  /** The object type id that has this object type attribute associated with it */
  objectTypeId: z.string(),
});

export type CreateObjectTypeAttribute = z.input<typeof CreateObjectTypeAttributeSchema>;
