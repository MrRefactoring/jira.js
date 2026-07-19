import { z } from 'zod';

export const RestoreCustomFieldSchema = z.object({
  /** The ID of a custom field. */
  id: z.string(),
});

export type RestoreCustomField = z.input<typeof RestoreCustomFieldSchema>;
