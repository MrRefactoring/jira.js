import { z } from 'zod';
import { ObjectSchemaSchema } from '../models';

export const UpdateSchemaSchema = z.object({
  id: z.string(),
  body: ObjectSchemaSchema.optional(),
});

export type UpdateSchema = z.input<typeof UpdateSchemaSchema>;
