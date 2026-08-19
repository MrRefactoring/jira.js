import { z } from 'zod';
import { CustomFieldDefinitionSchema } from '../models';

export const CreateCustomFieldSchema = z.object(CustomFieldDefinitionSchema.shape);

export type CreateCustomField = z.input<typeof CreateCustomFieldSchema>;
