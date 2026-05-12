import { z } from 'zod';
import { ScreenableTabSchema } from '../models';

export const AddScreenTabSchema = z
  .object({
    /** The ID of the screen. */
    screenId: z.number(),
  })
  .extend(ScreenableTabSchema.shape);

export type AddScreenTab = z.input<typeof AddScreenTabSchema>;
