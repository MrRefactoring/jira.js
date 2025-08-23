import { z } from 'zod';

export const RestoreCustomFieldParametersSchema = z.object({
  /** The ID of a custom field. */
  id: z.string(),
});

export type RestoreCustomFieldParameters = z.infer<typeof RestoreCustomFieldParametersSchema>;
