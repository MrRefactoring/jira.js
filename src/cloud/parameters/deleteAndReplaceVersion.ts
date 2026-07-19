import { z } from 'zod';
import { DeleteAndReplaceVersionSchema as DeleteAndReplaceVersionModelSchema } from '../models';

export const DeleteAndReplaceVersionSchema = z
  .object({
    /** The ID of the version. */
    id: z.string(),
  })
  .extend(DeleteAndReplaceVersionModelSchema.shape);

export type DeleteAndReplaceVersion = z.input<typeof DeleteAndReplaceVersionSchema>;
