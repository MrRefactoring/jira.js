import type { AdditionalComment } from './additionalComment.js';

export interface CustomerTransitionExecution {
  /** ID of the transition to be performed. */
  id?: string;
  additionalComment?: AdditionalComment;
}
