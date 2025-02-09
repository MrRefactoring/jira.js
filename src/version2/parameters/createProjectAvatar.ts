export interface CreateProjectAvatar {
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: string | number;
  avatar: any;
  /** The X coordinate of the top-left corner of the crop region. */
  x?: number;
  /** The Y coordinate of the top-left corner of the crop region. */
  y?: number;
