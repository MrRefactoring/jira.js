import { pageSchema, type Page } from './page';
import { CommentSchema, type Comment } from './comment';

export const PagedCommentSchema = pageSchema(CommentSchema);

/** @deprecated Use `Page<Comment>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedComment = Page<Comment>;
