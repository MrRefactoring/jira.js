/** @deprecated Use ProjectIdentifier instead. */
export type ProjectIdentifierBean = ProjectIdentifier;

/** The identifiers for a project. */
export interface ProjectIdentifier {
  /** The ID of the project. */
  id?: number;
  /** The key of the project. */
  key?: string;
}
