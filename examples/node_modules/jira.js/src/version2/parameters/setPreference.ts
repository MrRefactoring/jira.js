export interface SetPreference {
  /** The key of the preference. The maximum length is 255 characters. */
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any | string;
}
