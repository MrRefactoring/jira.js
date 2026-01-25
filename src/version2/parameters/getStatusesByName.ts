/** Parameters for getting statuses by name. */
export interface GetStatusesByName {
  /**
   * The list of status names.
   *
   * Min items `1`, Max items `50`
   */
  name: string[];

  /** The project the status is part of or null for global statuses. */
  projectId?: string;
}
