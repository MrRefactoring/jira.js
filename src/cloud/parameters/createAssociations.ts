import { z } from 'zod';
import { FieldAssociationsRequestSchema } from '../models';

export const CreateAssociationsSchema = z.object(FieldAssociationsRequestSchema.shape);

export type CreateAssociations = z.input<typeof CreateAssociationsSchema>;
