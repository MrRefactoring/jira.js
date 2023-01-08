import * as FormData from 'form-data';
import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueAttachments {
  constructor(private client: Client) {}

  /**
   * Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment
   * to download. See the [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * for details.
   *
   * To return a thumbnail of the attachment, use [Get attachment
   * thumbnail](#api-rest-api-3-attachment-thumbnail-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentContent<T = Buffer>(
    parameters: Parameters.GetAttachmentContent | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment
   * to download. See the [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * for details.
   *
   * To return a thumbnail of the attachment, use [Get attachment
   * thumbnail](#api-rest-api-3-attachment-thumbnail-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentContent<T = Buffer>(
    parameters: Parameters.GetAttachmentContent | string,
    callback?: never
  ): Promise<T>;
  async getAttachmentContent<T = Buffer>(
    parameters: Parameters.GetAttachmentContent | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/attachment/content/${id}`,
      method: 'GET',
      params: {
        redirect: typeof parameters !== 'string' && parameters.redirect,
      },
      responseType: 'arraybuffer',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the attachment settings, that is, whether attachments are enabled and the maximum attachment size allowed.
   *
   * Note that there are also [project permissions](https://confluence.atlassian.com/x/yodKLg) that restrict whether
   * users can create and delete attachments.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the attachment settings, that is, whether attachments are enabled and the maximum attachment size allowed.
   *
   * Note that there are also [project permissions](https://confluence.atlassian.com/x/yodKLg) that restrict whether
   * users can create and delete attachments.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: never): Promise<T>;
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/attachment/meta',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the thumbnail of an attachment.
   *
   * To return the attachment contents, use [Get attachment content](#api-rest-api-3-attachment-content-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentThumbnail<T = Buffer>(
    parameters: Parameters.GetAttachmentThumbnail | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the thumbnail of an attachment.
   *
   * To return the attachment contents, use [Get attachment content](#api-rest-api-3-attachment-content-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentThumbnail<T = Buffer>(
    parameters: Parameters.GetAttachmentThumbnail | string,
    callback?: never
  ): Promise<T>;
  async getAttachmentThumbnail<T = Buffer>(
    parameters: Parameters.GetAttachmentThumbnail | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/attachment/thumbnail/${id}`,
      method: 'GET',
      params: {
        redirect: typeof parameters !== 'string' && parameters.redirect,
        fallbackToDefault: typeof parameters !== 'string' && parameters.fallbackToDefault,
        width: typeof parameters !== 'string' && parameters.width,
        height: typeof parameters !== 'string' && parameters.height,
      },
      responseType: 'arraybuffer',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the metadata for an attachment. Note that the attachment itself is not returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachment<T = Models.AttachmentMetadata>(
    parameters: Parameters.GetAttachment | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the metadata for an attachment. Note that the attachment itself is not returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachment<T = Models.AttachmentMetadata>(
    parameters: Parameters.GetAttachment | string,
    callback?: never
  ): Promise<T>;
  async getAttachment<T = Models.AttachmentMetadata>(
    parameters: Parameters.GetAttachment | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/attachment/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an attachment from an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * project holding the issue containing the attachment:
   *
   * - _Delete own attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *   created by the calling user.
   * - _Delete all attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *   created by any user.
   */
  async removeAttachment<T = void>(
    parameters: Parameters.RemoveAttachment | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes an attachment from an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * project holding the issue containing the attachment:
   *
   * - _Delete own attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *   created by the calling user.
   * - _Delete all attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *   created by any user.
   */
  async removeAttachment<T = void>(parameters: Parameters.RemoveAttachment | string, callback?: never): Promise<T>;
  async removeAttachment<T = void>(
    parameters: Parameters.RemoveAttachment | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/attachment/${id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the metadata for the contents of an attachment, if it is an archive, and metadata for the attachment
   * itself. For example, if the attachment is a ZIP archive, then information about the files in the archive is
   * returned and metadata for the ZIP archive. Currently, only the ZIP archive format is supported.
   *
   * Use this operation to retrieve data that is presented to the user, as this operation returns the metadata for the
   * attachment itself, such as the attachment's ID and name. Otherwise, use [ Get contents metadata for an expanded
   * attachment](#api-rest-api-3-attachment-id-expand-raw-get), which only returns the metadata for the attachment's
   * contents.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(
    parameters: Parameters.ExpandAttachmentForHumans | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the metadata for the contents of an attachment, if it is an archive, and metadata for the attachment
   * itself. For example, if the attachment is a ZIP archive, then information about the files in the archive is
   * returned and metadata for the ZIP archive. Currently, only the ZIP archive format is supported.
   *
   * Use this operation to retrieve data that is presented to the user, as this operation returns the metadata for the
   * attachment itself, such as the attachment's ID and name. Otherwise, use [ Get contents metadata for an expanded
   * attachment](#api-rest-api-3-attachment-id-expand-raw-get), which only returns the metadata for the attachment's
   * contents.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(
    parameters: Parameters.ExpandAttachmentForHumans | string,
    callback?: never
  ): Promise<T>;
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(
    parameters: Parameters.ExpandAttachmentForHumans | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/attachment/${id}/expand/human`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a
   * ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is
   * supported.
   *
   * Use this operation if you are processing the data without presenting it to the user, as this operation only returns
   * the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use [ Get all
   * metadata for an expanded attachment](#api-rest-api-3-attachment-id-expand-human-get) which also returns the
   * metadata for the attachment itself, such as the attachment's ID and name.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(
    parameters: Parameters.ExpandAttachmentForMachines | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a
   * ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is
   * supported.
   *
   * Use this operation if you are processing the data without presenting it to the user, as this operation only returns
   * the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use [ Get all
   * metadata for an expanded attachment](#api-rest-api-3-attachment-id-expand-human-get) which also returns the
   * metadata for the attachment itself, such as the attachment's ID and name.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(
    parameters: Parameters.ExpandAttachmentForMachines | string,
    callback?: never
  ): Promise<T>;
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(
    parameters: Parameters.ExpandAttachmentForMachines | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/attachment/${id}/expand/raw`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds one or more attachments to an issue. Attachments are posted as multipart/form-data ([RFC
   * 1867](https://www.ietf.org/rfc/rfc1867.txt)).
   *
   * Note that:
   *
   * - The request must have a `X-Atlassian-Token: no-check` header, if not it is blocked. See [Special
   *   headers](#special-request-headers) for more information.
   * - The name of the multipart/form-data parameter that contains the attachments must be `file`.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse Projects_ and _Create attachments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addAttachment<T = Models.Attachment[]>(
    parameters: Parameters.AddAttachment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds one or more attachments to an issue. Attachments are posted as multipart/form-data ([RFC
   * 1867](https://www.ietf.org/rfc/rfc1867.txt)).
   *
   * Note that:
   *
   * - The request must have a `X-Atlassian-Token: no-check` header, if not it is blocked. See [Special
   *   headers](#special-request-headers) for more information.
   * - The name of the multipart/form-data parameter that contains the attachments must be `file`.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse Projects_ and _Create attachments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addAttachment<T = Models.Attachment[]>(parameters: Parameters.AddAttachment, callback?: never): Promise<T>;
  async addAttachment<T = Models.Attachment[]>(
    parameters: Parameters.AddAttachment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const formData = new FormData();
    const attachments = Array.isArray(parameters.attachment) ? parameters.attachment : [parameters.attachment];

    attachments.forEach(attachment => formData.append('file', attachment.file, attachment.filename));

    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/attachments`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': 'multipart/form-data',
        ...formData.getHeaders?.(),
      },
      data: formData,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    };

    return this.client.sendRequest(config, callback);
  }
}
