import { z } from 'zod';

export const WorkflowRuleSearchParametersSchema = z.object({
  /** The app migration transfer ID. */
  'Atlassian-Transfer-Id': z.string(),
  /**
   * Use expand to include additional information in the response. This parameter accepts `transition` which, for each
   * rule, returns information about the transition the rule is assigned to.
   */
  expand: z.string().optional(),
  /** The list of workflow rule IDs. */
  ruleIds: z.array(z.string()),
  /** The workflow ID. */
  workflowEntityId: z.string(),
});

export type WorkflowRuleSearchParameters = z.infer<typeof WorkflowRuleSearchParametersSchema>;
