export interface PutAddonProperty {
  /** The key of the app, as defined in its descriptor. */
  addonKey: string;
  /** The key of the property. */
  propertyKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any;
}
