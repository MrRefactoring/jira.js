/** Details of an issue priority. */
export interface UpdatePriorityDetails {
  /** The name of the priority. Must be unique. */
  name?: string;
  /** The description of the priority. */
  description?: string;
  /** The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. */
  iconUrl?: string;
  /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
  statusColor?: string;
}
