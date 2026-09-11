import { z } from 'zod';

export const GetCommentPropertySchema = z.object({
  /** The key of the property to return. */
  propertyKey: z.string(),
  /** The comment from which the property will be returned. */
  commentId: z.string(),
});

export type GetCommentProperty = z.input<typeof GetCommentPropertySchema>;
