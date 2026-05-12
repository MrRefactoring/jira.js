import { z } from 'zod';
import { ScreenableTabSchema } from '../models';

export const RenameScreenTabSchema = z
  .object({
    /** The ID of the screen. */
    screenId: z.number(),
    /** The ID of the screen tab. */
    tabId: z.number(),
  })
  .extend(ScreenableTabSchema.shape);

export type RenameScreenTab = z.input<typeof RenameScreenTabSchema>;
