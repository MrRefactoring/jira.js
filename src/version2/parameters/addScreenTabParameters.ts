import { z } from 'zod';

export const AddScreenTabParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  id: z.number().int().optional(),
  /** The name of the screen tab. The maximum length is 255 characters. */
  name: z.string(),
});

export type AddScreenTabParameters = z.infer<typeof AddScreenTabParametersSchema>;
