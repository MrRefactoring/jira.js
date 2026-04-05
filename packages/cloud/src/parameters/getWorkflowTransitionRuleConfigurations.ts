import { z } from 'zod';

export const GetWorkflowTransitionRuleConfigurationsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /** The types of the transition rules to return. */
  types: z.array(z.enum(['postfunction', 'condition', 'validator'])),
  /**
   * The transition rule class keys, as defined in the Connect or the Forge app descriptor, of the transition rules to
   * return.
   */
  keys: z.array(z.string()).optional(),
  /** The list of workflow names to filter by. */
  workflowNames: z.array(z.string().max(50, 'workflowNames must be at most 50 characters')).optional(),
  /** The list of `tags` to filter by. */
  withTags: z.array(z.string().max(20, 'withTags must be at most 20 characters')).optional(),
  /**
   * **Deprecated:** Whether draft or published workflows are returned. If not provided, both workflow types are
   * returned. The 'draft' parameter will be removed from this API on [November 2,
   * 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147).
   */
  draft: z.boolean().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information in the response. This parameter accepts `transition`, which, for each rule, returns information about
   * the transition the rule is assigned to.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['transition']), z.array(z.enum(['transition']))])
    .optional(),
});

export type GetWorkflowTransitionRuleConfigurations = z.input<typeof GetWorkflowTransitionRuleConfigurationsSchema>;
