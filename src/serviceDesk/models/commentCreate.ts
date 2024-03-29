export interface CommentCreate {
  /** Content of the comment. */
  body?: string;
  /** Indicates whether the comment is public (true) or private/internal (false). */
  public?: boolean;
}
