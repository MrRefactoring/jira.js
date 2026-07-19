import { z } from 'zod';
import { FieldAssociationsRequestSchema } from '../models';

export const RemoveAssociationsSchema = z.object({}).extend(FieldAssociationsRequestSchema.shape);

export type RemoveAssociations = z.input<typeof RemoveAssociationsSchema>;
