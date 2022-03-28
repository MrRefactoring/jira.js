import { EntityProperty } from './entityProperty';
import { UserDetails } from './userDetails';
import { Visibility } from './visibility';

/** A comment. */
export interface Comment {
  /** The URL of the comment. */
  self?: string;
  /** The ID of the comment. */
  id?: string;
  author?: UserDetails;
  /** The comment text. */
  body?: string;
  /** The rendered version of the comment. */
  renderedBody?: string;
  updateAuthor?: UserDetails;
  /** The date and time at which the comment was created. */
  created?: string;
  /** The date and time at which the comment was updated last. */
  updated?: string;
  visibility?: Visibility;
  /**
   * Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud
   * Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk
   * project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its
   * visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request
   * comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post)
   * operation.
   */
  jsdPublic?: boolean;
  /**
   * Whether the comment was added from an email sent by a person who is not part of the issue. See [Allow external
   * emails to be added as comments on
   * issues](https://support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for
   * information on setting up this feature.
   */
  jsdAuthorCanSeeRequest?: boolean;
  /** A list of comment properties. Optional on create and update. */
  properties?: EntityProperty[];
}
