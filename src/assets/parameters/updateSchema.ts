import { z } from 'zod';
import { ObjectSchemaUpdateSchema } from '../models';

export const UpdateSchemaSchema = z.object(ObjectSchemaUpdateSchema.shape).extend({
  /** The object schema id */
  id: z.string(),
});

export type UpdateSchema = z.input<typeof UpdateSchemaSchema>;
