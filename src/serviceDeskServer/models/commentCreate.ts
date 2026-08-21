import { z } from 'zod';
import { apiObject } from '#/core';

export const CommentCreateSchema = apiObject({
  body: z.string().optional(),
  public: z.boolean().optional(),
});

export type CommentCreate = z.infer<typeof CommentCreateSchema>;
