import { CustomerTransitionExecution } from '../models/index.mjs';

export interface PerformCustomerTransition extends CustomerTransitionExecution {
  /** ID or key of the issue to transition */
  issueIdOrKey: string;
}
