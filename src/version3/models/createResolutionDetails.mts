/** Details of an issue resolution. */
export interface CreateResolutionDetails {
  /** The name of the resolution. Must be unique (case-insensitive). */
  name: string;
  /** The description of the resolution. */
  description?: string;
}
