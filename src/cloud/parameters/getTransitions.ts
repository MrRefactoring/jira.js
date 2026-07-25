import { z } from 'zod';

export const GetTransitionsSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about transitions in the response. This parameter accepts `transitions.fields`, which returns
   * information about the fields in the transition screen for each transition. Fields hidden from the screen are not
   * returned. Use this information to populate the `fields` and `update` fields in [Transition
   * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueIdOrKey-transitions-post).
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['transitions.fields']), z.array(z.enum(['transitions.fields']))])
    .optional(),
  /** The ID of the transition. */
  transitionId: z.string().optional(),
  /**
   * Whether transitions with the condition _Hide From User Condition_ are included in the response. Available to
   * Connect and Forge app users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)
   * and Forge apps acting on behalf of users with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  skipRemoteOnlyCondition: z.boolean().optional(),
  /** Whether details of transitions that fail a condition are included in the response */
  includeUnavailableTransitions: z.boolean().optional(),
  /**
   * Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or
   * only by ops-bar sequence value.
   */
  sortByOpsBarAndStatus: z.boolean().optional(),
});

export type GetTransitions = z.input<typeof GetTransitionsSchema>;
