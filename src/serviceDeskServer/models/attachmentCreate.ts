import { z } from 'zod';
import { apiObject } from '#/core';
import { AdditionalCommentSchema } from './additionalComment';

export const AttachmentCreateSchema = apiObject({
  temporaryAttachmentIds: z.array(z.string()).optional(),
  public: z.boolean().optional(),
  additionalComment: AdditionalCommentSchema.optional(),
});

export type AttachmentCreate = z.infer<typeof AttachmentCreateSchema>;
