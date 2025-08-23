import { z } from 'zod';

export const GetWorklogPropertyKeysParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  worklogId: z.string(),
});

export type GetWorklogPropertyKeysParameters = z.infer<typeof GetWorklogPropertyKeysParametersSchema>;
