import { z } from 'zod';
import { CustomFieldDefinitionJsonSchema } from '../models';

export const CreateCustomFieldSchema = z.object({}).extend(CustomFieldDefinitionJsonSchema.shape);

export type CreateCustomField = z.input<typeof CreateCustomFieldSchema>;
