import { User } from '../models';

export interface AssignIssue extends Omit<User, 'accountId' | 'active'> {
  /** The ID or key of the issue to be assigned. */
  issueIdOrKey: string;

  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. If passed `null` it will unassigned issue.
   */
  accountId: string | null;

  /** Whether the user is active. */
  active?: boolean;
}
