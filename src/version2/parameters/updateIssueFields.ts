import type { ConnectCustomFieldValues } from '../models';

export interface UpdateIssueFields extends ConnectCustomFieldValues {
  /** The ID of the transfer. */
  transferId: string;
  /** The Atlassian account ID of the impersonated user. This user must be a member of the site admin group. */
  accountId: string;
}
