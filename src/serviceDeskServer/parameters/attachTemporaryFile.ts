import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const AttachTemporaryFileSchema = z.object({
  /** The ID of the service desk. */
  serviceDeskId: z.string(),
  body: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type AttachTemporaryFile = z.input<typeof AttachTemporaryFileSchema>;
