import { z } from 'zod';

export const DeleteCommentPropertyParametersSchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteCommentPropertyParameters = z.infer<typeof DeleteCommentPropertyParametersSchema>;
