import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

export const AddCommentParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand: z.string().optional(),
  /** The ID of the user who created the comment. */
  author: z.unknown().optional(),
  /** The comment text. */
  body: z.string().optional(),
  /** The date and time at which the comment was created. */
  created: z.string().datetime().optional(),
  /** The ID of the comment. */
  id: z.string().optional(),
  /**
   * Whether the comment was added from an email sent by a person who is not part of the issue. See [Allow external
   * emails to be added as comments on
   * issues](https://support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for
   * information on setting up this feature.
   */
  jsdAuthorCanSeeRequest: z.boolean().optional(),
  /**
   * Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud
   * Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk
   * project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its
   * visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request
   * comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post)
   * operation.
   */
  jsdPublic: z.boolean().optional(),
  /** A list of comment properties. Optional on create and update. */
  properties: z.array(EntityPropertySchema).optional(),
  /** The rendered version of the comment. */
  renderedBody: z.string().optional(),
  /** The URL of the comment. */
  self: z.string().optional(),
  /** The ID of the user who updated the comment last. */
  updateAuthor: z.unknown().optional(),
  /** The date and time at which the comment was updated last. */
  updated: z.string().datetime().optional(),
  /** The group or role to which this comment is visible. Optional on create and update. */
  visibility: z.unknown().optional(),
});

export type AddCommentParameters = z.infer<typeof AddCommentParametersSchema>;
