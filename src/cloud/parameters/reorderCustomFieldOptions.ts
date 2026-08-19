import { z } from 'zod';
import { OrderOfCustomFieldOptionsSchema } from '../models';

export const ReorderCustomFieldOptionsSchema = z.object(OrderOfCustomFieldOptionsSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type ReorderCustomFieldOptions = z.input<typeof ReorderCustomFieldOptionsSchema>;
