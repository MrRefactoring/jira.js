import { z } from 'zod';
import { ObjectTypeInSchema } from '../models';

export const CreateObjectTypeSchema = z.object(ObjectTypeInSchema.shape);

export type CreateObjectType = z.input<typeof CreateObjectTypeSchema>;
