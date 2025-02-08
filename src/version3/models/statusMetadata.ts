/** The details of the statuses in the associated workflows. */
export interface StatusMetadata {
  /** The category of the status. */
  category?: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
}
