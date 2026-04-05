import { AttachmentSettingsSchema, type AttachmentSettings } from '#/models/attachmentSettings';
import { AttachmentMetadataSchema, type AttachmentMetadata } from '#/models/attachmentMetadata';
import { AttachmentSchema, type Attachment } from '#/models/attachment';
import { type GetAttachmentContent } from '#/parameters/getAttachmentContent';
import { type GetAttachmentThumbnail } from '#/parameters/getAttachmentThumbnail';
import { type GetAttachment } from '#/parameters/getAttachment';
import { type RemoveAttachment } from '#/parameters/removeAttachment';
import { type AddAttachment } from '#/parameters/addAttachment';
import {
  type Client,
  type SendRequestOptions,
  createMultipartRequestBody,
  BufferSchema,
  type Buffer,
} from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment
 * to download. See the [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
 * for details.
 *
 * To return a thumbnail of the attachment, use [Get attachment
 * thumbnail](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-attachment/#api-rest-api-3-attachment-thumbnail-id-get).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** For the
 * issue containing the attachment:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If attachments are added in private comments, the comment-level restriction will be applied.
 */
export async function getAttachmentContent(client: Client, parameters: GetAttachmentContent): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/rest/api/3/attachment/content/${parameters.id}`,
    method: 'GET',
    searchParams: {
      redirect: parameters.redirect,
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the attachment settings, that is, whether attachments are enabled and the maximum attachment size allowed.
 *
 * Note that there are also [project permissions](https://confluence.atlassian.com/x/yodKLg) that restrict whether users
 * can create and delete attachments.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAttachmentMeta(client: Client): Promise<AttachmentSettings> {
  const config: SendRequestOptions<AttachmentSettings> = {
    url: '/rest/api/3/attachment/meta',
    method: 'GET',
    schema: AttachmentSettingsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the thumbnail of an attachment.
 *
 * To return the attachment contents, use [Get attachment
 * content](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-attachment/#api-rest-api-3-attachment-content-id-get).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** For the
 * issue containing the attachment:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If attachments are added in private comments, the comment-level restriction will be applied.
 */
export async function getAttachmentThumbnail(client: Client, parameters: GetAttachmentThumbnail): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/rest/api/3/attachment/thumbnail/${parameters.id}`,
    method: 'GET',
    searchParams: {
      redirect: parameters.redirect,
      fallbackToDefault: parameters.fallbackToDefault,
      width: parameters.width,
      height: parameters.height,
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the metadata for an attachment. Note that the attachment itself is not returned.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If attachments are added in private comments, the comment-level restriction will be applied.
 */
export async function getAttachment(client: Client, parameters: GetAttachment): Promise<AttachmentMetadata> {
  const config: SendRequestOptions<AttachmentMetadata> = {
    url: `/rest/api/3/attachment/${parameters.id}`,
    method: 'GET',
    schema: AttachmentMetadataSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an attachment from an issue.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** For the
 * project holding the issue containing the attachment:
 *
 * - _Delete own attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
 *   created by the calling user.
 * - _Delete all attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
 *   created by any user.
 */
export async function removeAttachment(client: Client, parameters: RemoveAttachment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/attachment/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Adds one or more attachments to an issue.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse Projects_ and _Create attachments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function addAttachment(client: Client, parameters: AddAttachment): Promise<Attachment[]> {
  const items = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];
  const { body, headers: multipartHeaders } = createMultipartRequestBody(items);

  const config: SendRequestOptions<Attachment[]> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/attachments`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
      ...multipartHeaders,
    },
    body,
    schema: z.array(AttachmentSchema),
  };

  return await client.sendRequest(config);
}
