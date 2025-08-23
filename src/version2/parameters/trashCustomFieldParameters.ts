import { z } from 'zod';

export const TrashCustomFieldParametersSchema = z.object({
  /** The ID of a custom field. */
  id: z.string(),
});

export type TrashCustomFieldParameters = z.infer<typeof TrashCustomFieldParametersSchema>;
