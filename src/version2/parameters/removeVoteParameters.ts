import { z } from 'zod';

export const RemoveVoteParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type RemoveVoteParameters = z.infer<typeof RemoveVoteParametersSchema>;
