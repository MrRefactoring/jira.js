import { z } from 'zod';

export const AddVoteSchema = z.object({
  /** Issue id. */
  issueIdOrKey: z.string(),
});

export type AddVote = z.input<typeof AddVoteSchema>;
