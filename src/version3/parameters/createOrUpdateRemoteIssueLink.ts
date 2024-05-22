import type { RemoteIssueLinkRequest } from '../models/index.js';

export interface CreateOrUpdateRemoteIssueLink extends RemoteIssueLinkRequest {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}
