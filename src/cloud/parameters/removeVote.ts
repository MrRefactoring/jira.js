import { z } from 'zod';

export const RemoveVoteSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type RemoveVote = z.input<typeof RemoveVoteSchema>;
