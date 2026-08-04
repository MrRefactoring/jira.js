import { z } from 'zod';
import { apiObject } from '#/core';
import { ChangelogSchema } from './changelog';
/** List of changelogs that belong to single issue */

export const IssueChangeLogSchema = apiObject({
  /** List of changelogs that belongs to given issueId. */
  changeHistories: z.array(ChangelogSchema).optional(),
  /** The ID of the issue. */
  issueId: z.string().optional(),
});

export type IssueChangeLog = z.infer<typeof IssueChangeLogSchema>;
