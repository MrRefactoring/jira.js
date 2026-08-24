import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const StoreTemporaryAvatarUsingMultiPartSchema = z.object({
  type: z.string(),
  /** Entity id where to change avatar */
  owningObjectId: z.string(),
  avatar: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type StoreTemporaryAvatarUsingMultiPart = z.input<typeof StoreTemporaryAvatarUsingMultiPartSchema>;
