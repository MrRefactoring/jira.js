import { z } from 'zod';
import { DeleteAndReplaceVersionSchema as DeleteAndReplaceVersionModelSchema } from '../models';

export const DeleteAndReplaceVersionSchema = z.object({}).extend(DeleteAndReplaceVersionModelSchema.shape).extend({
  /** The ID of the version. */
  id: z.string(),
});

export type DeleteAndReplaceVersion = z.input<typeof DeleteAndReplaceVersionSchema>;
