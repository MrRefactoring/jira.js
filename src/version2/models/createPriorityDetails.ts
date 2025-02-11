/** Details of an issue priority. */
export interface CreatePriorityDetails {
  /**
   * The ID for the avatar for the priority. Either the iconUrl or avatarId must be defined, but not both. This
   * parameter is nullable and will become mandatory once the iconUrl parameter is deprecated.
   */
  avatarId?: number;
  /** The description of the priority. */
  description?: string;
  /** The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. */
  iconUrl?: string;
  /** The name of the priority. Must be unique. */
  name: string;
  /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
  statusColor: string;
}
