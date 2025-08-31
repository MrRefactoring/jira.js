import { open } from 'fs/promises';
import { basename } from 'path';
import type { Attachment } from '../version2/parameters';

export async function createAttachmentFromPath(path: string, contentType?: string): Promise<Attachment> {
  const filename = basename(path);

  const fileHandle = await open(path, 'r');

  const { size } = await fileHandle.stat();

  return {
    filename,
    content: fileHandle.readableWebStream(),
    contentType,
    contentLength: size,
  };
}
