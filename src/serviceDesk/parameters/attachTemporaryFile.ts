import type { Readable } from 'node:stream';

/**
 * Represents an attachment to be temporarily attached to a Service Desk.
 *
 * @example
 *   ```typescript
 *   const attachment: Attachment = {
 *     filename: 'example.txt',
 *     file: Buffer.from('Temporary file content'),
 *     mimeType: 'text/plain',
 *   };
 *   ```
 */
export interface Attachment {
  /**
   * The name of the attachment file.
   *
   * @example
   *   ```typescript
   *   const filename = 'example.png';
   *   ```
   */
  filename: string;

  /**
   * The content of the attachment. Can be one of the following:
   *
   * - `Buffer`: For binary data.
   * - `ReadableStream`: For streaming large files.
   * - `string`: For text-based content.
   * - `Blob`: For browser-like blob objects.
   * - `File`: For file objects with metadata (e.g., in web environments).
   *
   * @example
   *   ```typescript
   *   const fileContent = Buffer.from('Example content here');
   *   ```
   */
  file: Buffer | ReadableStream | Readable | string | Blob | File;

  /**
   * Optional MIME type of the attachment. Example values include:
   *
   * - 'application/pdf'
   * - 'image/jpeg' If not provided, the MIME type will be automatically detected based on the filename.
   *
   * @example
   *   ```typescript
   *   const mimeType = 'image/jpeg';
   *   ```
   */
  mimeType?: string;
}

/**
 * Parameters for attaching temporary files to a Service Desk.
 *
 * @example
 *   ```typescript
 *   const attachTemporaryFileParams: AttachTemporaryFile = {
 *     serviceDeskId: '5',
 *     attachment: [
 *       {
 *         filename: 'example.txt',
 *         file: Buffer.from('Temporary file content'),
 *         mimeType: 'text/plain',
 *       },
 *     ],
 *   };
 *   ```
 */
export interface AttachTemporaryFile {
  /**
   * The ID of the Service Desk to which the file will be attached. This can alternatively be a [project
   * identifier](#project-identifiers).
   *
   * @example
   *   ```typescript
   *   const serviceDeskId = '5';
   *   ```
   */
  serviceDeskId: string;

  /**
   * The attachment(s) to be added. Can be a single `Attachment` object or an array of `Attachment` objects.
   *
   * @example
   *   ```typescript
   *   const attachments = [
   *     {
   *       filename: 'file1.txt',
   *       file: Buffer.from('Temporary content 1'),
   *       mimeType: 'text/plain',
   *     },
   *     {
   *       filename: 'file2.jpeg',
   *       file: Buffer.from('Temporary content 2'),
   *       mimeType: 'image/jpeg',
   *     },
   *   ];
   *   ```
   */
  attachment: Attachment | Attachment[];
}
