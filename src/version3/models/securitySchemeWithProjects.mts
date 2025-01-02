/** Details about an issue security scheme. */
export interface SecuritySchemeWithProjects {
  /** The default level ID of the issue security scheme. */
  defaultLevel?: number;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the issue security scheme. */
  id: number;
  /** The name of the issue security scheme. */
  name: string;
  /** The list of project IDs associated with the issue security scheme. */
  projectIds?: number[];
  /** The URL of the issue security scheme. */
  self: string;
}
