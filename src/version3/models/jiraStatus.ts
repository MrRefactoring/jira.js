import { ProjectIssueTypesSchema } from './projectIssueTypes';
import { StatusScopeSchema } from './statusScope';
import { z } from 'zod';

/** Details of a status. */
export const JiraStatusSchema = z.strictObject({
  /** The ID of the status. */
  id: z.string(),
  /** The name of the status. */
  name: z.string(),
  /** The description of the status. */
  description: z.string(),
  scope: StatusScopeSchema,
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  /**
   * @deprecated See the [deprecation
   *   notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298) for details.
   *
   *   Projects and issue types where the status is used. Only available if the `usages` expand is requested.
   */
  usages: ProjectIssueTypesSchema.optional(),
});

export type JiraStatus = z.infer<typeof JiraStatusSchema>;
