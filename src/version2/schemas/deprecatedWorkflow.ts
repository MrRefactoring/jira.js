import { z } from 'zod';

/** Details about a workflow. */
export const DeprecatedWorkflowSchema = z.object({
  default: z.boolean().optional(),
  /** The description of the workflow. */
  description: z.string().optional(),
  /** The datetime the workflow was last modified. */
  lastModifiedDate: z.string().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  lastModifiedUser: z.string().optional(),
  /** The account ID of the user that last modified the workflow. */
  lastModifiedUserAccountId: z.string().optional(),
  /** The name of the workflow. */
  name: z.string().optional(),
  /** The scope where this workflow applies */
  scope: z.unknown().optional(),
  /** The number of steps included in the workflow. */
  steps: z.number().int().optional(),
});

export type DeprecatedWorkflow = z.infer<typeof DeprecatedWorkflowSchema>;
