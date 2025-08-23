import { z } from 'zod';

export const GetCommentPropertyKeysParametersSchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
});

export type GetCommentPropertyKeysParameters = z.infer<typeof GetCommentPropertyKeysParametersSchema>;
