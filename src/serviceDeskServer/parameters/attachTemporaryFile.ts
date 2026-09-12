import { z } from 'zod';
import { FilePartSchema } from '../models';

export const AttachTemporaryFileSchema = z.object({
  /** The ID of the service desk. */
  serviceDeskId: z.string(),
  body: z.array(FilePartSchema).optional(),
});

export type AttachTemporaryFile = z.input<typeof AttachTemporaryFileSchema>;
