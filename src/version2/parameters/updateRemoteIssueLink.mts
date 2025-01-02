import { RemoteIssueLinkRequest } from '../models/index.mjs';

export interface UpdateRemoteIssueLink extends RemoteIssueLinkRequest {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The ID of the remote issue link. */
  linkId: string;
}
