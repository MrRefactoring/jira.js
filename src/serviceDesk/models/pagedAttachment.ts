import { pageSchema, type Page } from './page';
import { AttachmentSchema, type Attachment } from './attachment';

export const PagedAttachmentSchema = pageSchema(AttachmentSchema);

/** @deprecated Use `Page<Attachment>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedAttachment = Page<Attachment>;
