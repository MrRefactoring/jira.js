import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';

export const CommentSchema = apiObject({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  id: z.number().optional(),
  actor: UserSchema.optional(),
  role: z.number().optional(),
  comment: z.string().optional(),
  commentOutput: z.string().optional(),
  objectId: z.number().optional(),
  canEdit: z.boolean().optional(),
  canDelete: z.boolean().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
