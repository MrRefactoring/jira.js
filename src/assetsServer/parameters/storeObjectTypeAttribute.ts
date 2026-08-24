import { z } from 'zod';
import { ObjectTypeAttributeInSchema } from '../models';

export const StoreObjectTypeAttributeSchema = z.object(ObjectTypeAttributeInSchema.shape).extend({
  /** The ID of the object type to store the attribute for. */
  objectTypeId: z.string(),
});

export type StoreObjectTypeAttribute = z.input<typeof StoreObjectTypeAttributeSchema>;
