import { z } from 'zod';
import { CustomFieldContextUpdateDetailsSchema } from '../models';

export const UpdateCustomFieldContextSchema = z.object(CustomFieldContextUpdateDetailsSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type UpdateCustomFieldContext = z.input<typeof UpdateCustomFieldContextSchema>;
