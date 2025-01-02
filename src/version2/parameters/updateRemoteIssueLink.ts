import type { RemoteIssueLinkRequest } from '../models/index.js';

export interface UpdateRemoteIssueLink extends RemoteIssueLinkRequest {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The ID of the remote issue link. */
  linkId: string;
}
