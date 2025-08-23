import { z } from 'zod';

/** Details of a screen. */
export const ScreenDetailsSchema = z.object({
  /** The description of the screen. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
});

export type ScreenDetails = z.infer<typeof ScreenDetailsSchema>;
