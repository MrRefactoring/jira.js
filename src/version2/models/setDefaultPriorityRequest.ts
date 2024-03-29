/** The new default issue priority. */
export interface SetDefaultPriorityRequest {
  /**
   * The ID of the new default issue priority. Must be an existing ID or null. Setting this to null erases the default
   * priority setting.
   */
  id: string;
}
