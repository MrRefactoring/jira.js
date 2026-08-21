import { z } from 'zod';
import { MoveFieldSchema as MoveFieldModelSchema } from '../models';

export const MoveFieldSchema = z.object(MoveFieldModelSchema.shape).extend({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
  /** Id of field */
  id: z.string(),
});

export type MoveField = z.input<typeof MoveFieldSchema>;
