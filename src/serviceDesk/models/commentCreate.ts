import { z } from 'zod';
import { apiObject } from '#/core';

export const CommentCreateSchema = apiObject({
  /** Content of the comment. */
  body: z.string().optional(),
  /** Indicates whether the comment is public (true) or private/internal (false). */
  public: z.boolean().optional(),
});

export type CommentCreate = z.infer<typeof CommentCreateSchema>;
