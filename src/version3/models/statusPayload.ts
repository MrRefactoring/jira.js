import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for creating a status */
export interface StatusPayload {
  /** The description of the status */
  description?: string;
  /** The name of the status */
  name?: string;
  /**
   * The conflict strategy for the status already exists. FAIL - Fail execution, this always needs to be unique; USE -
   * Use the existing entity and ignore new entity parameters; NEW - Create a new entity
   */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The status category of the status. The value is case-sensitive. */
  statusCategory?: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
}
