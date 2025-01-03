export interface Attachment {
  filename: string;
  file: Buffer | ReadableStream | string | Blob | File;
  mimeType?: string;
}

export interface AddAttachment {
  /** The ID or key of the issue that attachments are added to. */
  issueIdOrKey: string;

  attachment: Attachment | Attachment[];
}
