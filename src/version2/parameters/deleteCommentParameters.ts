import { z } from 'zod';

export const DeleteCommentParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the comment. */
  id: z.string(),
});

export type DeleteCommentParameters = z.infer<typeof DeleteCommentParametersSchema>;
