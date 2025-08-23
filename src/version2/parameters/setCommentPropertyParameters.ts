import { z } from 'zod';

export const SetCommentPropertyParametersSchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
  /** The key of the property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type SetCommentPropertyParameters = z.infer<typeof SetCommentPropertyParametersSchema>;
