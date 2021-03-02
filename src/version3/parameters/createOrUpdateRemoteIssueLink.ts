import { RemoteIssueLinkRequest } from '../models';

export interface CreateOrUpdateRemoteIssueLink extends RemoteIssueLinkRequest {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}
