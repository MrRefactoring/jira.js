import { z } from 'zod';

export const GetIsWatchingIssueBulkParametersSchema = z.object({
  /** The list of issue IDs. */
  issueIds: z.array(z.string()),
});

export type GetIsWatchingIssueBulkParameters = z.infer<typeof GetIsWatchingIssueBulkParametersSchema>;
