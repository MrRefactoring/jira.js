import { z } from 'zod';
import { CreateCustomFieldContextSchema as CreateCustomFieldContextModelSchema } from '../models';

export const CreateCustomFieldContextSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
  })
  .extend(CreateCustomFieldContextModelSchema.shape);

export type CreateCustomFieldContext = z.input<typeof CreateCustomFieldContextSchema>;
