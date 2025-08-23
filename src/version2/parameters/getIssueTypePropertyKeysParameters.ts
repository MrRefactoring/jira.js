import { z } from 'zod';

export const GetIssueTypePropertyKeysParametersSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
});

export type GetIssueTypePropertyKeysParameters = z.infer<typeof GetIssueTypePropertyKeysParametersSchema>;
