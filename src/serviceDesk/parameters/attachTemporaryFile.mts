export interface Attachment {
  filename: string;
  file: Buffer | ReadableStream | string | Blob | File;
}

export interface AttachTemporaryFile {
  /**
   * The ID of the Service Desk to which the file will be attached. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  attachment: Attachment | Attachment[];
}
