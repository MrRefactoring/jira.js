/** Details of an issue resolution. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateResolution extends Record<string, any> {
  /** The description of the resolution. */
  description?: string;
  /** The name of the resolution. Must be unique (case-insensitive). */
  name: string;
}
