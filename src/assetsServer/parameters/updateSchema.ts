import { z } from 'zod';
import { ObjectSchemaSchema } from '../models';

export const UpdateSchemaSchema = z.object({
  id: z.number(),
  body: ObjectSchemaSchema.optional(),
});

export type UpdateSchema = z.input<typeof UpdateSchemaSchema>;
