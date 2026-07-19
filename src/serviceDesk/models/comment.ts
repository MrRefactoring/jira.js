import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { PagedAttachmentSchema } from './pagedAttachment';
import { UserSchema } from './user';
import { DateSchema } from './date';
import { RenderedValueSchema } from './renderedValue';

export const CommentSchema = apiObject({
  /** List of items that can be expanded in the response by specifying the expand query parameter. */
  _expands: z.array(z.string()).optional(),
  _links: SelfLinkSchema.optional(),
  attachments: PagedAttachmentSchema.optional(),
  author: UserSchema.optional(),
  /** Content of the comment. */
  body: z.string().optional(),
  created: DateSchema.optional(),
  /** ID of the comment. */
  id: z.string().optional(),
  /** Indicates whether the comment is public (true) or private/internal (false). */
  public: z.boolean().optional(),
  renderedBody: RenderedValueSchema.optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
