import { z } from 'zod';
import { CreateCustomFieldContextSchema as CreateCustomFieldContextModelSchema } from '../models';

export const CreateCustomFieldContextSchema = z.object(CreateCustomFieldContextModelSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
});

export type CreateCustomFieldContext = z.input<typeof CreateCustomFieldContextSchema>;
