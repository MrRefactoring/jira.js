import { z } from 'zod';
import { UserDetailsSchema } from '#/models/userDetails';
import { EntityPropertySchema } from '#/models/entityProperty';
import { VisibilitySchema } from '#/models/visibility';

/** A comment. */
export const CommentSchema = z.object({
  author: UserDetailsSchema.optional(),
  /**
   * The comment text in [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
   */
  body: z.unknown().optional(),
  /** The date and time at which the comment was created. */
  created: z
    .string()
    .transform(s => new Date(s))
    .optional(),
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
  updateAuthor: UserDetailsSchema.optional(),
  /** The date and time at which the comment was updated last. */
  updated: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  visibility: VisibilitySchema.optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
