import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const StoreTemporaryIssueTypeAvatarUsingMultiPartSchema = z.object({
  /** The issue type id. */
  id: z.string(),
  avatar: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type StoreTemporaryIssueTypeAvatarUsingMultiPart = z.input<
  typeof StoreTemporaryIssueTypeAvatarUsingMultiPartSchema
>;
