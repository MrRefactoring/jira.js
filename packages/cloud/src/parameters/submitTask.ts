import { z } from 'zod';

export const SubmitTaskSchema = z.object({
  /** The key of the Connect app that contains the Jira issue field being migrated. */
  connectKey: z.string(),
  /** The module key of the Connect issue field being migrated. */
  jiraIssueFieldsKey: z.string(),
});

export type SubmitTask = z.input<typeof SubmitTaskSchema>;
