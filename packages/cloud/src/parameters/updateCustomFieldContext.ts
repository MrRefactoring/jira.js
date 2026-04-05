import { z } from 'zod';
import { CustomFieldContextUpdateDetailsSchema } from '../models';

export const UpdateCustomFieldContextSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(CustomFieldContextUpdateDetailsSchema.shape);

export type UpdateCustomFieldContext = z.input<typeof UpdateCustomFieldContextSchema>;
