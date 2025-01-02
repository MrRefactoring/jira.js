import type { User } from './user.js';

export interface Approver {
  approver?: User;
  /** Decision made by the approver. */
  approverDecision?: string;
}
