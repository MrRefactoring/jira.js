/** The trigger configuration associated with a workflow. */
export interface WorkflowTrigger {
  /** The ID of the trigger. */
  id?: string;
  /** The parameters of the trigger. */
  parameters: unknown;
  /** The rule key of the trigger. */
  ruleKey: string;
}
