import { z } from 'zod';

export const AddScreenTabFieldParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  tabId: z.number().int(),
  /** The ID of the field to add. */
  fieldId: z.string(),
});

export type AddScreenTabFieldParameters = z.infer<typeof AddScreenTabFieldParametersSchema>;
