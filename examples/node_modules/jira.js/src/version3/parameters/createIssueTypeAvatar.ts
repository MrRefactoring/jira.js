export interface CreateIssueTypeAvatar {
  /** The ID of the issue type. */
  id: string;
  /** The X coordinate of the top-left corner of the crop region. */
  x?: number;
  /** The Y coordinate of the top-left corner of the crop region. */
  y?: number;
  /**
   * The length of each side of the crop region.
   *
   * @default 0
   */
  size?: number;
  mimeType: string;
  avatar: Buffer | ArrayBuffer | Uint8Array;
}
