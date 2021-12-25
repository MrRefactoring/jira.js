import { CustomerTransitionExecution } from '../models';

export interface PerformCustomerTransition extends CustomerTransitionExecution {
  /** ID or key of the issue to transition */
  issueIdOrKey: string;
}
