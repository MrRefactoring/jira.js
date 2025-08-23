import { z } from 'zod';

export const GetRemoteIssueLinksParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The global ID of the remote issue link. */
  globalId: z.string().optional(),
});

export type GetRemoteIssueLinksParameters = z.infer<typeof GetRemoteIssueLinksParametersSchema>;
