import { z } from 'zod';

export const GetCommentPropertySchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetCommentProperty = z.input<typeof GetCommentPropertySchema>;
