import { z } from 'zod';
import { AddFieldSchema } from '../models';

export const AddScreenTabFieldSchema = z
  .object({
    /** The ID of the screen. */
    screenId: z.number(),
    /** The ID of the screen tab. */
    tabId: z.number(),
  })
  .extend(AddFieldSchema.shape);

export type AddScreenTabField = z.input<typeof AddScreenTabFieldSchema>;
