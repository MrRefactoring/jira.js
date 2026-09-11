import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const StoreTemporaryProjectAvatarUsingMultiPartSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
  avatar: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type StoreTemporaryProjectAvatarUsingMultiPart = z.input<typeof StoreTemporaryProjectAvatarUsingMultiPartSchema>;
