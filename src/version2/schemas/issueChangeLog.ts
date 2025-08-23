import { z } from 'zod';
import { ChangelogSchema } from './changelog';

/** List of changelogs that belong to single issue */
export const IssueChangeLogSchema = z.object({
  /** List of changelogs that belongs to given issueId. */
  changeHistories: z.array(ChangelogSchema).optional(),
  /** The ID of the issue. */
  issueId: z.string().optional(),
});

export type IssueChangeLog = z.infer<typeof IssueChangeLogSchema>;
