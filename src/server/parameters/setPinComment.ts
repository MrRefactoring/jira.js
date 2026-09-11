import { z } from 'zod';

export const SetPinCommentSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Comment id */
  id: z.string(),
  body: z.boolean(),
});

export type SetPinComment = z.input<typeof SetPinCommentSchema>;
