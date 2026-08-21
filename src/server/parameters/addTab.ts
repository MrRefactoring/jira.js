import { z } from 'zod';
import { ScreenableTabSchema } from '../models';

export const AddTabSchema = z.object(ScreenableTabSchema.shape).extend({
  /** Id of screen */
  screenId: z.number(),
});

export type AddTab = z.input<typeof AddTabSchema>;
