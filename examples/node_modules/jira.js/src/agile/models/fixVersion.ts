/** Represents a fix version in a Jira project. */
export interface FixVersion {
  /** The URL of the fix version details. */
  self: string;
  /** The unique identifier of the fix version. */
  id: string;
  /** The description of the fix version. */
  description: string;
  /** The name of the fix version. */
  name: string;
  /** Whether the fix version is archived. */
  archived: boolean;
  /** Whether the fix version is released. */
  released: boolean;
  /** The release date of the fix version, if applicable. */
  releaseDate?: string;
}
