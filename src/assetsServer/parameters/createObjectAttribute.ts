import { z } from 'zod';
import { ObjectAttributeInSchema } from '../models';

export const CreateObjectAttributeSchema = z.object(ObjectAttributeInSchema.shape).extend({
  /** Should the response include the object type attribute definition */
  includeTypeAttribute: z.string().optional(),
});

export type CreateObjectAttribute = z.input<typeof CreateObjectAttributeSchema>;
