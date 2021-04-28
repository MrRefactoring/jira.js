/**
 * Details about a project version.
 */
export interface Version {
  /** The URL of the version. */
  self?: string;
  /** The ID of the version. */
  id?: string;
  /** The description of the version. Optional when creating or updating a version. */
  description?: string;
  /** The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters. */
  name?: string;
  /** Indicates that the version is archived. Optional when creating or updating a version. */
  archived?: boolean;
  /** Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version. */
  released?: boolean;
  /** The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
  startDate?: string;
  /** The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
  releaseDate?: string;
  /** The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version. */
  projectId?: number;
}
