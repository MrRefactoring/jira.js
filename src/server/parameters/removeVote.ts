import { z } from 'zod';

export const RemoveVoteSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type RemoveVote = z.input<typeof RemoveVoteSchema>;
