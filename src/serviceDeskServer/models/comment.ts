import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { DateSchema } from './date';
import { SelfLinkSchema } from './selfLink';

export const CommentSchema = apiObject({
  id: z.string().optional(),
  body: z.string().optional(),
  public: z.boolean().optional(),
  author: UserSchema.optional(),
  created: DateSchema.optional(),
  _links: SelfLinkSchema.optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
