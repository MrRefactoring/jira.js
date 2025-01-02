/** Details of an issue resolution. */
export interface UpdateResolutionDetails {
  /** The description of the resolution. */
  description?: string;
  /** The name of the resolution. Must be unique. */
  name: string;
}
