/** Details of an issue resolution. */
export interface UpdateResolutionDetails {
  /** The name of the resolution. Must be unique. */
  name: string;
  /** The description of the resolution. */
  description?: string;
}
