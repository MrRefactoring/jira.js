import { z } from 'zod';

export const DeleteCommentPropertySchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteCommentProperty = z.input<typeof DeleteCommentPropertySchema>;
