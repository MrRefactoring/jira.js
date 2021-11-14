export interface GetAvatarImageByOwner {
  /** The icon type of the avatar. */
  type: string;
  /** The ID of the project or issue type the avatar belongs to. */
  entityId: string;
  /** The size of the avatar image. If not provided the default size is returned. */
  size?: string;
  /** The format to return the avatar image in. If not provided the original content format is returned. */
  format?: string;
}
