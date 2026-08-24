import { z } from 'zod';
import { apiObject } from '#/core';

export const AddReactionRequestSchema = apiObject({
  commentId: z.number().optional(),
  emojiId: z.string().optional(),
});

export type AddReactionRequest = z.infer<typeof AddReactionRequestSchema>;
