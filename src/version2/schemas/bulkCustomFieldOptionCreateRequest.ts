import { z } from 'zod';
import { CustomFieldOptionCreateSchema } from './customFieldOptionCreate';

/** Details of the options to create for a custom field. */
export const BulkCustomFieldOptionCreateRequestSchema = z.object({
  /** Details of options to create. */
  options: z.array(CustomFieldOptionCreateSchema).optional(),
});

export type BulkCustomFieldOptionCreateRequest = z.infer<typeof BulkCustomFieldOptionCreateRequestSchema>;
