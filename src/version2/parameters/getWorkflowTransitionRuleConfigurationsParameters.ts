import { z } from 'zod';

export const GetWorkflowTransitionRuleConfigurationsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /** The types of the transition rules to return. */
  types: z.array(z.enum(['postfunction', 'condition', 'validator'])),
  /**
   * The transition rule class keys, as defined in the Connect or the Forge app descriptor, of the transition rules to
   * return.
   */
  keys: z.array(z.string()).optional(),
  /** The list of workflow names to filter by. */
  workflowNames: z.array(z.string()).optional(),
  /** The list of `tags` to filter by. */
  withTags: z.array(z.string()).optional(),
  /** Whether draft or published workflows are returned. If not provided, both workflow types are returned. */
  draft: z.boolean().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts `transition`, which, for each rule, returns information about
   * the transition the rule is assigned to.
   */
  expand: z.string().optional(),
});

export type GetWorkflowTransitionRuleConfigurationsParameters = z.infer<
  typeof GetWorkflowTransitionRuleConfigurationsParametersSchema
>;
