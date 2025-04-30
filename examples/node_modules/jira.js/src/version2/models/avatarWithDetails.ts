export interface AvatarWithDetails {
  /** The content type of the avatar. Expected values include 'image/png', 'image/svg+xml', or any other valid MIME type. */
  contentType: 'image/png' | 'image/svg+xml' | string;
  /** The binary representation of the avatar image. */
  avatar: Uint8Array;
}
