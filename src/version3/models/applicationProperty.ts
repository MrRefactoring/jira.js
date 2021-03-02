/**
 * Details of an application property. */
export interface ApplicationProperty {
  /** The ID of the application property. The ID and key are the same. */
  id?: string;
  /** The key of the application property. The ID and key are the same. */
  key?: string;
  /** The new value. */
  value?: string;
  /** The name of the application property. */
  name?: string;
  /** The description of the application property. */
  desc?: string;
  /** The data type of the application property. */
  type?: string;
  /** The default value of the application property. */
  defaultValue?: string;
  example?: string;
  /** The allowed values, if applicable. */
  allowedValues?: string[];
}
