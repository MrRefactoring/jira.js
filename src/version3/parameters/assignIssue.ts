import { User } from '../models';

export interface AssignIssue extends User {
  /** The ID or key of the issue to be assigned. */
  issueIdOrKey: string;
}
