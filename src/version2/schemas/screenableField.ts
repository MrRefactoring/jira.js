import { z } from 'zod';

/** A screen tab field. */
export const ScreenableFieldSchema = z.object({
  /** The ID of the screen tab field. */
  id: z.string().optional(),
  /** The name of the screen tab field. Required on create and update. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type ScreenableField = z.infer<typeof ScreenableFieldSchema>;
