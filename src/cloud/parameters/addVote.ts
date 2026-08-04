import { z } from 'zod';

export const AddVoteSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type AddVote = z.input<typeof AddVoteSchema>;
