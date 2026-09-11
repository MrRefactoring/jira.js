import { z } from 'zod';

export const DeleteCommentPropertySchema = z.object({
  /** The key of the property to remove. */
  propertyKey: z.string(),
  /** The comment from which the property will be removed. */
  commentId: z.string(),
});

export type DeleteCommentProperty = z.input<typeof DeleteCommentPropertySchema>;
