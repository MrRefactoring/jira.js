import { z } from 'zod';
import { UpdateCustomFieldDetailsSchema } from '../models';

export const UpdateCustomFieldSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
  })
  .extend(UpdateCustomFieldDetailsSchema.shape);

export type UpdateCustomField = z.input<typeof UpdateCustomFieldSchema>;
