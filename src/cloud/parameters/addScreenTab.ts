import { z } from 'zod';
import { ScreenableTabSchema } from '../models';

export const AddScreenTabSchema = z.object(ScreenableTabSchema.shape).extend({
  /** The ID of the screen. */
  screenId: z.number(),
});

export type AddScreenTab = z.input<typeof AddScreenTabSchema>;
