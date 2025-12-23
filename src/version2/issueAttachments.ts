import type { Mime } from 'mime';
import mime from 'mime';
import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueAttachments {
  constructor(private client: Client) {}

  /**
   * Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment
   * to download. See the [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * for details.
   *
   * To return a thumbnail of the attachment, use [Get attachment
   * thumbnail](#api-rest-api-2-attachment-thumbnail-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachmentContent<T = Buffer>(
    parameters: Parameters.GetAttachmentContent | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment
   * to download. See the [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * for details.
   *
   * To return a thumbnail of the attachment, use [Get attachment
   * thumbnail](#api-rest-api-2-attachment-thumbnail-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachmentContent<T = Buffer>(
    parameters: Parameters.GetAttachmentContent | string,
    callback?: never,
  ): Promise<T>;
  async getAttachmentContent<T = Buffer>(
    parameters: Parameters.GetAttachmentContent | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/attachment/content/${id}`,
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: never): Promise<T>;
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/attachment/meta',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the thumbnail of an attachment.
   *
   * To return the attachment contents, use [Get attachment content](#api-rest-api-2-attachment-content-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachmentThumbnail<T = Buffer>(
    parameters: Parameters.GetAttachmentThumbnail | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the thumbnail of an attachment.
   *
   * To return the attachment contents, use [Get attachment content](#api-rest-api-2-attachment-content-id-get).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachmentThumbnail<T = Buffer>(
    parameters: Parameters.GetAttachmentThumbnail | string,
    callback?: never,
  ): Promise<T>;
  async getAttachmentThumbnail<T = Buffer>(
    parameters: Parameters.GetAttachmentThumbnail | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/attachment/thumbnail/${id}`,
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachment<T = Models.AttachmentMetadata>(
    parameters: Parameters.GetAttachment | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the metadata for an attachment. Note that the attachment itself is not returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachment<T = Models.AttachmentMetadata>(
    parameters: Parameters.GetAttachment | string,
    callback?: never,
  ): Promise<T>;
  async getAttachment<T = Models.AttachmentMetadata>(
    parameters: Parameters.GetAttachment | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/attachment/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an attachment from an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * project holding the issue containing the attachment:
   *
   * - _Delete own attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *   created by the calling user.
   * - _Delete all attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *   created by any user.
   */
  async removeAttachment<T = void>(
    parameters: Parameters.RemoveAttachment | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes an attachment from an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
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
      url: `/rest/api/2/attachment/${id}`,
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
   * attachment](#api-rest-api-2-attachment-id-expand-raw-get), which only returns the metadata for the attachment's
   * contents.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(
    parameters: Parameters.ExpandAttachmentForHumans | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the metadata for the contents of an attachment, if it is an archive, and metadata for the attachment
   * itself. For example, if the attachment is a ZIP archive, then information about the files in the archive is
   * returned and metadata for the ZIP archive. Currently, only the ZIP archive format is supported.
   *
   * Use this operation to retrieve data that is presented to the user, as this operation returns the metadata for the
   * attachment itself, such as the attachment's ID and name. Otherwise, use [ Get contents metadata for an expanded
   * attachment](#api-rest-api-2-attachment-id-expand-raw-get), which only returns the metadata for the attachment's
   * contents.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(
    parameters: Parameters.ExpandAttachmentForHumans | string,
    callback?: never,
  ): Promise<T>;
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(
    parameters: Parameters.ExpandAttachmentForHumans | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/attachment/${id}/expand/human`,
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
   * metadata for an expanded attachment](#api-rest-api-2-attachment-id-expand-human-get) which also returns the
   * metadata for the attachment itself, such as the attachment's ID and name.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(
    parameters: Parameters.ExpandAttachmentForMachines | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a
   * ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is
   * supported.
   *
   * Use this operation if you are processing the data without presenting it to the user, as this operation only returns
   * the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use [ Get all
   * metadata for an expanded attachment](#api-rest-api-2-attachment-id-expand-human-get) which also returns the
   * metadata for the attachment itself, such as the attachment's ID and name.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   * issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(
    parameters: Parameters.ExpandAttachmentForMachines | string,
    callback?: never,
  ): Promise<T>;
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(
    parameters: Parameters.ExpandAttachmentForMachines | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/attachment/${id}/expand/raw`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds one or more attachments to an issue. Attachments are posted as multipart/form-data ([RFC
   * 1867](https://www.ietf.org/rfc/rfc1867.txt)).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Browse Projects_ and _Create attachments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addAttachment<T = Models.Attachment[]>(
    parameters: Parameters.AddAttachment,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds one or more attachments to an issue. Attachments are posted as multipart/form-data ([RFC
   * 1867](https://www.ietf.org/rfc/rfc1867.txt)).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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

    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    let Readable: typeof import('stream').Readable | undefined;

    if (typeof window === 'undefined') {
      const { Readable: NodeReadable } = await import('stream');

      Readable = NodeReadable;
    }

    for await (const attachment of attachments) {
      const file = await this._convertToFile(attachment, mime, Readable);

      if (!(file instanceof File || file instanceof Blob)) {
        throw new Error(`Unsupported file type for attachment: ${typeof file}`);
      }

      formData.append('file', file, attachment.filename);
    }

    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/attachments`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    };

    return this.client.sendRequest(config, callback);
  }

  private async _convertToFile(
    attachment: Parameters.Attachment,
    mime: Mime,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    Readable?: typeof import('stream').Readable,
  ): Promise<File | Blob> {
    const toUint8ArrayCopy = (input: ArrayBuffer | ArrayBufferView) => {
      if (ArrayBuffer.isView(input)) {
        const view = input as ArrayBufferView;
        const src = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
        const copy = new Uint8Array(src.byteLength);
        copy.set(src);

        return copy;
      }
      const buf = input as ArrayBuffer;
      const src = new Uint8Array(buf);
      const copy = new Uint8Array(src.byteLength);
      copy.set(src);

      return copy;
    };

    const mergeChunks = (chunks: Uint8Array[]) => {
      const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const c of chunks) {
        merged.set(c, offset);
        offset += c.byteLength;
      }

      return merged;
    };

    const mimeType = attachment.mimeType ?? (mime.getType(attachment.filename) || undefined);

    if (attachment.file instanceof Blob || attachment.file instanceof File) {
      return attachment.file;
    }

    if (typeof attachment.file === 'string') {
      return new File([attachment.file], attachment.filename, { type: mimeType });
    }

    if (Readable && attachment.file instanceof Readable) {
      return this._streamToBlob(attachment.file, attachment.filename, mimeType);
    }

    if (attachment.file instanceof ReadableStream) {
      return this._streamToBlob(attachment.file, attachment.filename, mimeType);
    }

    if (ArrayBuffer.isView(attachment.file) || attachment.file instanceof ArrayBuffer) {
      const chunk = toUint8ArrayCopy(attachment.file as ArrayBuffer | ArrayBufferView);
      const merged = mergeChunks([chunk]);
      const blob = new Blob([merged], { type: mimeType });

      return new File([blob], attachment.filename, { type: mimeType });
    }

    throw new Error('Unsupported attachment file type.');
  }

  private async _streamToBlob(
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    stream: import('stream').Readable | ReadableStream,
    filename: string,
    mimeType?: string,
  ): Promise<File> {
    const mergeChunks = (chunks: Uint8Array[]) => {
      const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const c of chunks) {
        merged.set(c, offset);
        offset += c.byteLength;
      }

      return merged;
    };

    if (typeof window === 'undefined' && stream instanceof (await import('stream')).Readable) {
      return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];

        stream.on('data', (chunk: Uint8Array | Buffer) => {
          chunks.push(new Uint8Array(chunk));
        });

        stream.on('end', () => {
          const merged = mergeChunks(chunks);
          const blob = new Blob([merged], { type: mimeType });
          resolve(new File([blob], filename, { type: mimeType }));
        });

        stream.on('error', reject);
      });
    }

    if (stream instanceof ReadableStream) {
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (value) chunks.push(new Uint8Array(value));
        done = streamDone;
      }

      const merged = mergeChunks(chunks);
      const blob = new Blob([merged], { type: mimeType });

      return new File([blob], filename, { type: mimeType });
    }

    throw new Error('Unsupported stream type.');
  }
}
