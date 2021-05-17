export interface FieldMetaBean {
  /** Whether the field is required. */
  required?: boolean;
  schema?: {
    /** The data type of the field. */
    type?: string;
    /** When the data type is an array, the name of the field items within the array. */
    items?: string;
    /** If the field is a system field, the name of the field. */
    system?: string;
    /** If the field is a custom field, the URI of the field. */
    custom?: string;
    /** If the field is a custom field, the custom ID of the field. */
    customId?: number;
    /** If the field is a custom field, the configuration of the field. */
    configuration?: {};
  };
  /** The name of the field. */
  name?: string;
  /** The key of the field. */
  key?: string;
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl?: string;
  /** Whether the field has a default value. */
  hasDefaultValue?: boolean;
  /** The list of operations that can be performed on the field. */
  operations?: string[];
  /** The list of values allowed in the field. */
  allowedValues?: any[];
  /** The default value of the field. */
  defaultValue?: any;
}
