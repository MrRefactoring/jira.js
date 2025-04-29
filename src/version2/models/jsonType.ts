/** The schema of a field. */
export interface JsonType {
  /** If the field is a custom field, the configuration of the field. */
  configuration?: unknown;
  /** If the field is a custom field, the URI of the field. */
  custom?: string;
  /** If the field is a custom field, the custom ID of the field. */
  customId?: number;
  /** When the data type is an array, the name of the field items within the array. */
  items?: string;
  /** If the field is a system field, the name of the field. */
  system?: string;
  /** The data type of the field. */
  type: string;
}
