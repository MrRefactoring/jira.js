/** Details of the status being updated. */
export interface StatusUpdate {
  /** The ID of the status. */
  id: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: string;
  /** The description of the status. */
  description?: string;
}
