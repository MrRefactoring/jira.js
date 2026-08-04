import { z } from 'zod';
import { AddFieldSchema } from '../models';

export const AddScreenTabFieldSchema = z.object({}).extend(AddFieldSchema.shape).extend({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The ID of the screen tab. */
  tabId: z.number(),
  skipFieldAssociation: z.boolean().optional(),
});

export type AddScreenTabField = z.input<typeof AddScreenTabFieldSchema>;
