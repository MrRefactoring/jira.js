import { WorkflowRulesSearch } from '../models/index.mjs';

export interface WorkflowRuleSearch extends WorkflowRulesSearch {
  /** The app migration transfer ID. */
  transferId: string;
}
