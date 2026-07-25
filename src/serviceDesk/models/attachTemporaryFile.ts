import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachTemporaryFileSchema = apiObject({
  temporaryAttachments: z
    .array(
      apiObject({
        /** The id to hand to `createAttachment` when attaching this file to a request. */
        temporaryAttachmentId: z.string().optional(),
        /** The name the file was uploaded under. */
        fileName: z.string().optional(),
      }),
    )
    .optional(),
});

export type AttachTemporaryFile = z.infer<typeof AttachTemporaryFileSchema>;
