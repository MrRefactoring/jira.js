export interface CreateProjectAvatar {
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: string | number;
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
