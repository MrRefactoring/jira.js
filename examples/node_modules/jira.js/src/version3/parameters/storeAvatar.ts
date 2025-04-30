export interface StoreAvatar {
  /** The avatar type. */
  type: 'project' | 'issuetype' | string;
  /** The ID of the item the avatar is associated with. */
  entityId: number | string;
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
