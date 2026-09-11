import { z } from 'zod';
import { DeleteAndReplaceVersionSchema } from '../models';

export const DeleteVersionAndSwapSchema = z.object(DeleteAndReplaceVersionSchema.shape).extend({
  /** The version to delete */
  id: z.string(),
});

export type DeleteVersionAndSwap = z.input<typeof DeleteVersionAndSwapSchema>;
