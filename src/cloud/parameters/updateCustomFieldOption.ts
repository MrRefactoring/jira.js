import { z } from 'zod';
import { BulkCustomFieldOptionUpdateRequestSchema } from '../models';

export const UpdateCustomFieldOptionSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(BulkCustomFieldOptionUpdateRequestSchema.shape);

export type UpdateCustomFieldOption = z.input<typeof UpdateCustomFieldOptionSchema>;
