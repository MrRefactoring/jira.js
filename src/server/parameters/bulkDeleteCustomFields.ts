import { z } from 'zod';

export const BulkDeleteCustomFieldsSchema = z.object({
  /** A list of custom field IDs to delete. */
  ids: z.string(),
});

export type BulkDeleteCustomFields = z.input<typeof BulkDeleteCustomFieldsSchema>;
