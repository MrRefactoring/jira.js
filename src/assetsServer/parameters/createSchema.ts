import { z } from 'zod';
import { ObjectSchemaInSchema } from '../models';

export const CreateSchemaSchema = z.object(ObjectSchemaInSchema.shape);

export type CreateSchema = z.input<typeof CreateSchemaSchema>;
