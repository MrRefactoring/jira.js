export interface StoreAvatar {
  /** The avatar type. */
  type: string;
  /** The ID of the item the avatar is associated with. */
  entityId: string;
  /** The X coordinate of the top-left corner of the crop region. */
  x?: number;
  /** The Y coordinate of the top-left corner of the crop region. */
  y?: number;
  /** The length of each side of the crop region. */
  size: number;
}
