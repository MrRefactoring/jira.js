import { z } from 'zod';
import { ScreenableTabSchema } from '../models';

export const RenameTabSchema = z.object(ScreenableTabSchema.shape).extend({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
});

export type RenameTab = z.input<typeof RenameTabSchema>;
