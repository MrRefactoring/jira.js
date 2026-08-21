import { z } from 'zod';
import { AddFieldSchema as AddFieldModelSchema } from '../models';

export const AddFieldSchema = z.object(AddFieldModelSchema.shape).extend({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
});

export type AddField = z.input<typeof AddFieldSchema>;
