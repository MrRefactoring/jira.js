import { z } from 'zod';
import { apiObject } from '#/core';
import { AdditionalCommentSchema } from './additionalComment';

export const AttachmentCreateSchema = apiObject({
  additionalComment: AdditionalCommentSchema.optional(),
  /** Controls whether the comment and its attachments are visible to customers */
  public: z.boolean().optional(),
  /** List of IDs for the temporary attachments to be added to the customer request. */
  temporaryAttachmentIds: z.array(z.string()).optional(),
});

export type AttachmentCreate = z.infer<typeof AttachmentCreateSchema>;
