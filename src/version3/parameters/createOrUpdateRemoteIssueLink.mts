import { RemoteIssueLinkRequest } from '../models/index.mjs';

export interface CreateOrUpdateRemoteIssueLink extends RemoteIssueLinkRequest {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}
