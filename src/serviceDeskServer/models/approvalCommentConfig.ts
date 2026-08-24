import { z } from 'zod';
import { apiObject } from '#/core';

export const ApprovalCommentConfigSchema = apiObject({
  commentsRequiredWhenApprove: z.boolean().optional(),
  commentsRequiredWhenDecline: z.boolean().optional(),
});

export type ApprovalCommentConfig = z.infer<typeof ApprovalCommentConfigSchema>;
