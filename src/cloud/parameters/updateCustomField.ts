import { z } from 'zod';
import { UpdateCustomFieldDetailsSchema } from '../models';

export const UpdateCustomFieldSchema = z.object({}).extend(UpdateCustomFieldDetailsSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
});

export type UpdateCustomField = z.input<typeof UpdateCustomFieldSchema>;
