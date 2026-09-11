import { z } from 'zod';

export const GetEditIssueMetaSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetEditIssueMeta = z.input<typeof GetEditIssueMetaSchema>;
