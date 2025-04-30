/** Details of the status being created. */
export interface StatusCreate {
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: string;
  /** The description of the status. */
  description?: string;
}
