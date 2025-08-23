import { z } from 'zod';

export const AddVoteParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type AddVoteParameters = z.infer<typeof AddVoteParametersSchema>;
