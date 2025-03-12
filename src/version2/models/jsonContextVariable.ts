export interface JsonContextVariable {
  /** Type of custom context variable. */
  type: string;
  /** A JSON object containing custom content. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}
