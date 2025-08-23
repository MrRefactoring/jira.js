import { z } from 'zod';

export const GetTransitionsParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about transitions in the response. This parameter accepts `transitions.fields`, which returns
   * information about the fields in the transition screen for each transition. Fields hidden from the screen are not
   * returned. Use this information to populate the `fields` and `update` fields in [Transition
   * issue](#api-rest-api-2-issue-issueIdOrKey-transitions-post).
   */
  expand: z.string().optional(),
  /** The ID of the transition. */
  transitionId: z.string().optional(),
  /** Whether transitions with the condition _Hide From User Condition_ are included in the response. */
  skipRemoteOnlyCondition: z.boolean().optional(),
  /** Whether details of transitions that fail a condition are included in the response */
  includeUnavailableTransitions: z.boolean().optional(),
  /**
   * Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or
   * only by ops-bar sequence value.
   */
  sortByOpsBarAndStatus: z.boolean().optional(),
});

export type GetTransitionsParameters = z.infer<typeof GetTransitionsParametersSchema>;
