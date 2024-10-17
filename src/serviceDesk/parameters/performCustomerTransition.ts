import type { CustomerTransitionExecution } from '../models/index.js';

export interface PerformCustomerTransition extends CustomerTransitionExecution {
  /** ID or key of the issue to transition */
  issueIdOrKey: string;
}
