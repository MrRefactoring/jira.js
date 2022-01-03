import { User } from './user';

export interface Approver {
  approver?: User;
  /** Decision made by the approver. */
  approverDecision?: string;
}
