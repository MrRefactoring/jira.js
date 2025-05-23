/** Represents a usage of an entity by a project ID and related issue type IDs. */
export interface SimpleUsage {
  /** The issue type IDs for the usage. */
  issueTypeIds: string[];
  /** The project ID for the usage. */
  projectId: string;
}
