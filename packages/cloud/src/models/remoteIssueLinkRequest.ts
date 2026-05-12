import { z } from 'zod';
import { ApplicationSchema } from '#/models/application';
import { RemoteObjectSchema } from '#/models/remoteObject';

/** Details of a remote issue link. */
export const RemoteIssueLinkRequestSchema = z.object({
  application: ApplicationSchema.optional(),
  /**
   * An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence
   * would consist of the app ID and page ID, like this: `appId=456&pageId=123`.
   *
   * Setting this field enables the remote issue link details to be updated or deleted using remote system and item
   * details as the record identifier, rather than using the record's Jira ID.
   *
   * The maximum length is 255 characters.
   */
  globalId: z.string().optional(),
  object: RemoteObjectSchema.optional(),
  /**
   * Description of the relationship between the issue and the linked item. If not set, the relationship description
   * "links to" is used in Jira.
   */
  relationship: z.string().optional(),
});

export type RemoteIssueLinkRequest = z.infer<typeof RemoteIssueLinkRequestSchema>;
