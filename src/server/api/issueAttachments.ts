import { AttachmentMetaSchema, type AttachmentMeta } from '../models/attachmentMeta';
import { AttachmentSchema, type Attachment } from '../models/attachment';
import { HumanReadableArchiveSchema, type HumanReadableArchive } from '../models/humanReadableArchive';
import { AttachmentArchiveImplSchema, type AttachmentArchiveImpl } from '../models/attachmentArchiveImpl';
import type { GetAttachment } from '../parameters/getAttachment';
import type { RemoveAttachment } from '../parameters/removeAttachment';
import type { ExpandForHumans } from '../parameters/expandForHumans';
import type { ExpandForMachines } from '../parameters/expandForMachines';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the meta information for an attachments, specifically if they are enabled and the maximum upload size
 * allowed.
 */
export async function getAttachmentMeta(client: Client, options?: RequestOptions): Promise<AttachmentMeta> {
  const config: SendRequestOptions<AttachmentMeta> = {
    url: '/rest/api/2/attachment/meta',
    method: 'GET',
    schema: AttachmentMetaSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the meta-data for an attachment, including the URI of the actual attached file. */
export async function getAttachment(
  client: Client,
  parameters: GetAttachment,
  options?: RequestOptions,
): Promise<Attachment> {
  const config: SendRequestOptions<Attachment> = {
    url: `/rest/api/2/attachment/${parameters.id}`,
    method: 'GET',
    schema: AttachmentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Remove an attachment from an issue. */
export async function removeAttachment(
  client: Client,
  parameters: RemoveAttachment,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/attachment/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Tries to expand an attachment. Output is human-readable and subject to change. */
export async function expandForHumans(
  client: Client,
  parameters: ExpandForHumans,
  options?: RequestOptions,
): Promise<HumanReadableArchive> {
  const config: SendRequestOptions<HumanReadableArchive> = {
    url: `/rest/api/2/attachment/${parameters.id}/expand/human`,
    method: 'GET',
    schema: HumanReadableArchiveSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Tries to expand an attachment. Output is raw and should be backwards-compatible through the course of time. */
export async function expandForMachines(
  client: Client,
  parameters: ExpandForMachines,
  options?: RequestOptions,
): Promise<AttachmentArchiveImpl> {
  const config: SendRequestOptions<AttachmentArchiveImpl> = {
    url: `/rest/api/2/attachment/${parameters.id}/expand/raw`,
    method: 'GET',
    schema: AttachmentArchiveImplSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
