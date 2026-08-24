import { z } from 'zod';
import { ReferenceTypeInSchema } from '../models';

export const CreateReferenceTypeSchema = z.object(ReferenceTypeInSchema.shape);

export type CreateReferenceType = z.input<typeof CreateReferenceTypeSchema>;
