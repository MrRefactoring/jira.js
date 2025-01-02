import type { WorkflowRulesSearch } from '../models/index.js';

export interface WorkflowRuleSearch extends WorkflowRulesSearch {
  /** The app migration transfer ID. */
  transferId: string;
}
