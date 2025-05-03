import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for creating a board column */
export interface BoardColumnPayload {
  /** The maximum issue constraint for the column */
  maximumIssueConstraint?: number;
  /** The minimum issue constraint for the column */
  minimumIssueConstraint?: number;
  /** The name of the column */
  name?: string;
  /** The status IDs for the column */
  statusIds?: ProjectCreateResourceIdentifier[];
}
