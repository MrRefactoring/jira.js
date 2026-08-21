import { AttachmentCreateResultSchema, type AttachmentCreateResult } from '../models/attachmentCreateResult';
import {
  CreateTemporaryWebAttachmentResultSchema,
  type CreateTemporaryWebAttachmentResult,
} from '../models/createTemporaryWebAttachmentResult';
import type { CreateAttachment } from '../parameters/createAttachment';
import type { AttachTemporaryFile } from '../parameters/attachTemporaryFile';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Adds one or more temporary attachments that were created using [Attach temporary
 * file](#servicedeskapi-servicedesk-{serviceDeskId}-attachTemporaryFile-post) to a customer request.
 *
 * The attachment visibility is set by the `public` field.
 *
 * Setting attachment visibility is dependent on the user's permission. For example, Agents can create either public or
 * internal attachments, while Unlicensed users can only create internal attachments, and Customers can only create
 * public attachments.
 *
 * An additional comment may be provided which will be prepended to the attachments.
 */
export async function createAttachment(client: Client, parameters: CreateAttachment): Promise<AttachmentCreateResult> {
  const config: SendRequestOptions<AttachmentCreateResult> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment`,
    method: 'POST',
    body: {
      temporaryAttachmentIds: parameters.temporaryAttachmentIds,
      public: parameters.public,
      additionalComment: parameters.additionalComment,
    },
    schema: AttachmentCreateResultSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Create one or more temporary attachments, which can later be converted into permanent attachments on Create
 * attachment.
 *
 * On successful execution, this resource will return a list of temporary attachment IDs, which are used in subsequent
 * calls to convert the attachments into permanent attachments.
 *
 * This resource expects a multipart post. The media-type multipart/form-data is defined in RFC 1867. Most client
 * libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP
 * Components library provides a MultiPartEntity that makes it simple to submit a multipart POST.
 *
 * In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has XSRF protection on
 * it. This means you must submit a header of X-Atlassian-Token: no-check with the request, otherwise it will be
 * blocked.
 *
 * The name of the multipart/form-data parameter that contains attachments must be "file".
 *
 * A simple example to upload a file called "myfile.txt" in service project with ID 10001
 *
 * `curl -D- -u customer:customer -X POST -H "X-Atlassian-Token: no-check" -F`.
 */
export async function attachTemporaryFile(
  client: Client,
  parameters: AttachTemporaryFile,
): Promise<CreateTemporaryWebAttachmentResult> {
  const config: SendRequestOptions<CreateTemporaryWebAttachmentResult> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/attachTemporaryFile`,
    method: 'POST',
    body: parameters.body,
    schema: CreateTemporaryWebAttachmentResultSchema,
  };

  return await client.sendRequest(config);
}
