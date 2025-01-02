import { User } from './user.mjs';

export interface Approver {
  approver?: User;
  /** Decision made by the approver. */
  approverDecision?: string;
}
