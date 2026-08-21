import { AttachmentSchema, type Attachment } from '../models/attachment';
import { UploadedAttachmentSchema, type UploadedAttachment } from '../models/uploadedAttachment';
import type { GetAttachments } from '../parameters/getAttachments';
import type { AddAttachments } from '../parameters/addAttachments';
import type { DeleteAttachment } from '../parameters/deleteAttachment';
import { type Client, type SendRequestOptions, toFormDataFile } from '#/core';
import { z } from 'zod';

/** Get the attachments for an object by object ID. */
export async function getAttachments(client: Client, parameters: GetAttachments): Promise<Attachment[]> {
  const config: SendRequestOptions<Attachment[]> = {
    url: `/rest/assets/1.0/attachments/object/${parameters.objectId}`,
    method: 'GET',
    schema: z.array(AttachmentSchema),
  };

  return await client.sendRequest(config);
}

/** Add an attachment to an object by object ID. */
export async function addAttachments(client: Client, parameters: AddAttachments): Promise<UploadedAttachment[]> {
  const formData = new FormData();
  const items = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];

  for (const attachment of items) {
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<UploadedAttachment[]> = {
    url: `/rest/assets/1.0/attachments/object/${parameters.objectId}`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
    schema: z.array(UploadedAttachmentSchema),
  };

  return await client.sendRequest(config);
}

/** Delete an attachment by attachment ID. */
export async function deleteAttachment(client: Client, parameters: DeleteAttachment): Promise<Attachment> {
  const config: SendRequestOptions<Attachment> = {
    url: `/rest/assets/1.0/attachments/${parameters.attachmentId}`,
    method: 'DELETE',
    schema: AttachmentSchema,
  };

  return await client.sendRequest(config);
}
