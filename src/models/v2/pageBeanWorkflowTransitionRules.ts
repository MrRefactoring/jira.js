import { WorkflowTransitionRules } from './workflowTransitionRules';

export interface PageBeanWorkflowTransitionRules {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: WorkflowTransitionRules[];
}
