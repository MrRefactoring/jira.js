export interface GetAvatarImageByType {
  /** The icon type of the avatar. */
  type: string;
  /** The size of the avatar image. If not provided the default size is returned. */
  size?: string;
  /** The format to return the avatar image in. If not provided the original content format is returned. */
  format?: string;
}
