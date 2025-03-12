export interface SetProjectProperty {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string | number;
  /** The key of the project property. The maximum length is 255 characters. */
  propertyKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any;
}
