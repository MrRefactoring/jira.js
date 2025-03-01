export interface CreateCustomFieldRequest {
  /** The custom field ID. */
  customFieldId: number;
  /** Allows filtering issues based on their values for the custom field. */
  filter?: boolean;
}
