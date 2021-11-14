export interface GetAvatarImageByID {
  /** The icon type of the avatar. */
  type: string;
  /** The ID of the avatar. */
  id: number;
  /** The size of the avatar image. If not provided the default size is returned. */
  size?: string | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /** The format to return the avatar image in. If not provided the original content format is returned. */
  format?: string;
}
