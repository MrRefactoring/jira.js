/** A project category. */
export interface ProjectCategory {
  /** The URL of the project category. */
  self?: string;
  /** The ID of the project category. */
  id?: string;
  /** The name of the project category. Required on create, optional on update. */
  name?: string;
  /** The description of the project category. */
  description?: string;
}
