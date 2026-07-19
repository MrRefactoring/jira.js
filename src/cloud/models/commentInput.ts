import { z } from 'zod';
import { apiObject } from '#/core';
import { UserDetailsSchema } from './userDetails';
import { DocumentSchema } from './document';
import { EntityPropertySchema } from './entityProperty';
import { VisibilitySchema } from './visibility';
/** A comment. */

export const CommentInputSchema = apiObject({
  author: UserDetailsSchema.optional(),
  /**
   * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
   * parses it, and the result is read back as a document.
   */
  body: z.union([DocumentSchema, z.string()]).optional(),
  /** The date and time at which the comment was created. */
  created: z.coerce.date().optional(),
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
   * project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with
   * its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request
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
  updated: z.coerce.date().optional(),
  visibility: VisibilitySchema.optional(),
});

export type CommentInput = z.infer<typeof CommentInputSchema>;
