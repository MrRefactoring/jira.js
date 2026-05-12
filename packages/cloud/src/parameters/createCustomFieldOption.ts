import { z } from 'zod';
import { BulkCustomFieldOptionCreateRequestSchema } from '../models';

export const CreateCustomFieldOptionSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(BulkCustomFieldOptionCreateRequestSchema.shape);

export type CreateCustomFieldOption = z.input<typeof CreateCustomFieldOptionSchema>;
