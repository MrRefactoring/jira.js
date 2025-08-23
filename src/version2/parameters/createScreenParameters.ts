import { z } from 'zod';

export const CreateScreenParametersSchema = z.object({
  /** The description of the screen. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
});

export type CreateScreenParameters = z.infer<typeof CreateScreenParametersSchema>;
