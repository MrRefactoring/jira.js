import { z } from 'zod';
import { BulkCustomFieldOptionCreateRequestSchema } from '../models';

export const CreateCustomFieldOptionSchema = z.object(BulkCustomFieldOptionCreateRequestSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type CreateCustomFieldOption = z.input<typeof CreateCustomFieldOptionSchema>;
