import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';
import { EntityPropertySchema } from './entityProperty';
import { VisibilityJsonSchema } from './visibilityJson';

export const CommentJsonSchema = apiObject({
  author: UserJsonSchema.optional(),
  body: z.string().optional(),
  created: z.string().optional(),
  id: z.string().optional(),
  properties: z.array(EntityPropertySchema).optional(),
  renderedBody: z.string().optional(),
  self: z.string().optional(),
  updateAuthor: UserJsonSchema.optional(),
  updated: z.string().optional(),
  visibility: VisibilityJsonSchema.optional(),
});

export type CommentJson = z.infer<typeof CommentJsonSchema>;
