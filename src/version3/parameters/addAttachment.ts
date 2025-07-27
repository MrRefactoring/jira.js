import type { Readable } from 'node:stream';

/**
 * Represents an attachment to be added to an issue.
 *
 * @example
 *   ```typescript
 *   const attachment: Attachment = {
 *     filename: 'example.txt',
 *     file: Buffer.from('Hello, world!'),
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
   *   const filename = 'document.pdf';
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
   *   const fileContent = fs.readFileSync('./document.pdf');
   *   ```
   */
  file: Buffer | ReadableStream | Readable | string | Blob | File;

  /**
   * Optional MIME type of the attachment. Example values include:
   *
   * - 'application/pdf'
   * - 'image/png'
   *
   * If not provided, the MIME type will be automatically detected based on the filename.
   *
   * @example
   *   ```typescript
   *   const mimeType = 'application/pdf';
   *   ```
   */
  mimeType?: string;
}

/**
 * Parameters for adding attachments to an issue.
 *
 * @example
 *   ```typescript
 *   const addAttachmentParams: AddAttachment = {
 *     issueIdOrKey: 'PROJECT-123',
 *     attachment: {
 *       filename: 'example.txt',
 *       file: 'Hello, world!',
 *       mimeType: 'text/plain',
 *     },
 *   };
 *   ```
 */
export interface AddAttachment {
  /**
   * The ID or key of the issue to which the attachments will be added.
   *
   * @example
   *   ```typescript
   *   const issueIdOrKey = 'PROJECT-123';
   *   ```
   */
  issueIdOrKey: string;

  /**
   * The attachment(s) to be added. Can be a single `Attachment` object or an array of `Attachment` objects.
   *
   * @example
   *   ```typescript
   *   const attachments = [
   *     {
   *       filename: 'file1.txt',
   *       file: Buffer.from('File 1 content'),
   *       mimeType: 'text/plain',
   *     },
   *     {
   *       filename: 'proof image.png',
   *       file: fs.readFileSync('./image.png'), // Reads the image file into a Buffer
   *     },
   *   ];
   *   ```
   */
  attachment: Attachment | Attachment[];
}
