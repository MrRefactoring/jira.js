import { z } from 'zod';

export const GetCommentPropertyParametersSchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetCommentPropertyParameters = z.infer<typeof GetCommentPropertyParametersSchema>;
