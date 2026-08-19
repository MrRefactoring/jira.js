import { pageSchema, type Page } from './page';
import { WorkflowTransitionRulesSchema, type WorkflowTransitionRules } from './workflowTransitionRules';

export const PageWorkflowTransitionRulesSchema = pageSchema(WorkflowTransitionRulesSchema);

/**
 * @deprecated Use `Page<WorkflowTransitionRules>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageWorkflowTransitionRules = Page<WorkflowTransitionRules>;
