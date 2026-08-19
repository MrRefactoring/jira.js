import { z } from 'zod';
import { MoveFieldSchema } from '../models';

export const MoveScreenTabFieldSchema = z.object(MoveFieldSchema.shape).extend({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The ID of the screen tab. */
  tabId: z.number(),
  /** The ID of the field. */
  id: z.string(),
});

export type MoveScreenTabField = z.input<typeof MoveScreenTabFieldSchema>;
