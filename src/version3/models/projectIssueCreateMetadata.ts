import { AvatarUrlsBean } from './avatarUrlsBean';
import { IssueTypeIssueCreateMetadata } from './issueTypeIssueCreateMetadata';

/** Details of the issue creation metadata for a project. */
export interface ProjectIssueCreateMetadata {
  /** Expand options that include additional project issue create metadata details in the response. */
  expand?: string;
  /** The URL of the project. */
  self?: string;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  avatarUrls?: AvatarUrlsBean;
  /** List of the issue types supported by the project. */
  issuetypes?: IssueTypeIssueCreateMetadata[];
}
