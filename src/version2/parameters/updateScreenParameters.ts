import { z } from 'zod';

export const UpdateScreenParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The description of the screen. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type UpdateScreenParameters = z.infer<typeof UpdateScreenParametersSchema>;
