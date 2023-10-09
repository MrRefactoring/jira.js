export interface AvatarWithDetails {
  contentType: 'image/png' | 'image/svg+xml' | string;
  avatar: ArrayBuffer;
}
