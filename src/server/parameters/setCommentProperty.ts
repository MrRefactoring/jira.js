import { z } from 'zod';

export const SetCommentPropertySchema = z.object({
  /** The key of the comment's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string().max(255, 'propertyKey must be at most 255 characters'),
  /** The comment on which the property will be set. */
  commentId: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetCommentProperty = z.input<typeof SetCommentPropertySchema>;
