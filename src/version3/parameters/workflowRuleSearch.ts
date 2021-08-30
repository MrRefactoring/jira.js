import { WorkflowRulesSearch } from '../models';

export interface WorkflowRuleSearch extends WorkflowRulesSearch {
  /** The app migration transfer ID. */
  transferId: string;
}
