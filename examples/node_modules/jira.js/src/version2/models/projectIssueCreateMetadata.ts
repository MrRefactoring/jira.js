import type { AvatarUrls } from './avatarUrls';
import type { IssueTypeIssueCreateMetadata } from './issueTypeIssueCreateMetadata';

/** Details of the issue creation metadata for a project. */
export interface ProjectIssueCreateMetadata {
  avatarUrls?: AvatarUrls;
  /** Expand options that include additional project issue create metadata details in the response. */
  expand?: string;
  /** The ID of the project. */
  id?: string;
  /** List of the issue types supported by the project. */
  issuetypes?: IssueTypeIssueCreateMetadata[];
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The URL of the project. */
  self?: string;
}
