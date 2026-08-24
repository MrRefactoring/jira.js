import { z } from 'zod';

export const GetPinnedCommentsSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetPinnedComments = z.input<typeof GetPinnedCommentsSchema>;
