import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldOptionUpdateSchema } from './customFieldOptionUpdate';
/** Details of the options to update for a custom field. */

export const BulkCustomFieldOptionUpdateRequestSchema = apiObject({
  /** Details of the options to update. */
  options: z.array(CustomFieldOptionUpdateSchema).optional(),
});

export type BulkCustomFieldOptionUpdateRequest = z.infer<typeof BulkCustomFieldOptionUpdateRequestSchema>;
