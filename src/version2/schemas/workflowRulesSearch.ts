import { z } from 'zod';

/** Details of the workflow and its transition rules. */
export const WorkflowRulesSearchSchema = z.object({
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

export type WorkflowRulesSearch = z.infer<typeof WorkflowRulesSearchSchema>;
