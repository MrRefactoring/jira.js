import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const StoreTemporaryUserAvatarUsingMultiPartSchema = z.object({
  /** Username */
  username: z.string().optional(),
  avatar: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type StoreTemporaryUserAvatarUsingMultiPart = z.input<typeof StoreTemporaryUserAvatarUsingMultiPartSchema>;
