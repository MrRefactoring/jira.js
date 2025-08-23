import { z } from 'zod';
import { CustomFieldOptionUpdateSchema } from './customFieldOptionUpdate';

/** Details of the options to update for a custom field. */
export const BulkCustomFieldOptionUpdateRequestSchema = z.object({
  /** Details of the options to update. */
  options: z.array(CustomFieldOptionUpdateSchema).optional(),
});

export type BulkCustomFieldOptionUpdateRequest = z.infer<typeof BulkCustomFieldOptionUpdateRequestSchema>;
