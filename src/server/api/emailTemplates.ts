import { EmailTemplateTypesSchema, type EmailTemplateTypes } from '../models/emailTemplateTypes';
import type { UploadEmailTemplates } from '../parameters/uploadEmailTemplates';
import { type Client, type SendRequestOptions, BufferSchema, type Buffer } from '#/core';

/** Creates a zip file containing email templates at local home and returns the file. */
export async function downloadEmailTemplates(client: Client): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: '/rest/api/2/email-templates',
    method: 'GET',
    headers: {
      Accept: 'application/zip',
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}

/** Extracts given zip file to temporary templates folder. If the folder already exists it will replace it's content */
export async function uploadEmailTemplates(client: Client, parameters: UploadEmailTemplates): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/email-templates',
    method: 'POST',
    body: parameters.body,
    contentType: 'application/zip',
  };

  return await client.sendRequest(config);
}

/** Replaces the current email templates pack with previously uploaded one, if exists. */
export async function applyEmailTemplates(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/email-templates/apply',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Replaces the current email templates pack with default templates, which are copied over from Jira binaries. */
export async function revertEmailTemplatesToDefault(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/email-templates/revert',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Returns a list of root templates mapped with Event Types. The list can be used to decide which test emails to send. */
export async function getEmailTypes(client: Client): Promise<EmailTemplateTypes> {
  const config: SendRequestOptions<EmailTemplateTypes> = {
    url: '/rest/api/2/email-templates/types',
    method: 'GET',
    schema: EmailTemplateTypesSchema,
  };

  return await client.sendRequest(config);
}
