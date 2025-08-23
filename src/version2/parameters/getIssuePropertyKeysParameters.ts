import { z } from 'zod';

export const GetIssuePropertyKeysParametersSchema = z.object({
  /** The key or ID of the issue. */
  issueIdOrKey: z.string(),
});

export type GetIssuePropertyKeysParameters = z.infer<typeof GetIssuePropertyKeysParametersSchema>;
