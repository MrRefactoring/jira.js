import { z } from 'zod';
import { apiObject } from '#/core';

export const ApprovalCommentConfigSchema = apiObject({
  commentsRequiredWhenDecline: z.boolean().optional(),
  commentsRequiredWhenApprove: z.boolean().optional(),
});

export type ApprovalCommentConfig = z.infer<typeof ApprovalCommentConfigSchema>;
