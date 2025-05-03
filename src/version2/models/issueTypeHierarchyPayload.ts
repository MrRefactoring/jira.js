import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for creating an issue type hierarchy */
export interface IssueTypeHierarchyPayload {
  /** The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for subtasks */
  hierarchyLevel?: number;
  /** The name of the issue type */
  name?: string;
  /**
   * The conflict strategy to use when the issue type already exists. FAIL - Fail execution, this always needs to be
   * unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
}
