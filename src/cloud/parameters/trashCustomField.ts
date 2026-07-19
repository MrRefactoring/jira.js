import { z } from 'zod';

export const TrashCustomFieldSchema = z.object({
  /** The ID of a custom field. */
  id: z.string(),
});

export type TrashCustomField = z.input<typeof TrashCustomFieldSchema>;
