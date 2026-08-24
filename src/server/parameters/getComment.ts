import { z } from 'zod';

export const GetCommentSchema = z.object({
  /** Optional flags: renderedBody (provides body rendered in HTML) */
  expand: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Comment id */
  id: z.string(),
});

export type GetComment = z.input<typeof GetCommentSchema>;
