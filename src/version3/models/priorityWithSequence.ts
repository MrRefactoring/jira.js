/** An issue priority with sequence information. */
export interface PriorityWithSequence {
  /** The description of the issue priority. */
  description?: string;
  /** The URL of the icon for the issue priority. */
  iconUrl?: string;
  /** The ID of the issue priority. */
  id?: string;
  /** Whether this priority is the default. */
  isDefault?: boolean;
  /** The name of the issue priority. */
  name?: string;
  /** The URL of the issue priority. */
  self?: string;
  /** The sequence of the issue priority. */
  sequence?: string;
  /** The color used to indicate the issue priority. */
  statusColor?: string;
}
