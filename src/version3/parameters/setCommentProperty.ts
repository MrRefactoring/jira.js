export interface SetCommentProperty {
  /** The ID of the comment. */
  commentId: string;
  /** The key of the property. The maximum length is 255 characters. */
  propertyKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  property: any;
}
