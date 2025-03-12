import type { AdditionalComment } from './additionalComment';

export interface CustomerTransitionExecution {
  /** ID of the transition to be performed. */
  id?: string;
  additionalComment?: AdditionalComment;
}
