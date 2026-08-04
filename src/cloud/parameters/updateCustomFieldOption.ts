import { z } from 'zod';
import { BulkCustomFieldOptionUpdateRequestSchema } from '../models';

export const UpdateCustomFieldOptionSchema = z
  .object({})
  .extend(BulkCustomFieldOptionUpdateRequestSchema.shape)
  .extend({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  });

export type UpdateCustomFieldOption = z.input<typeof UpdateCustomFieldOptionSchema>;
