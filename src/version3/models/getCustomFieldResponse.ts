export interface GetCustomFieldResponse {
  /** The custom field ID. */
  customFieldId: number;
  /** Allows filtering issues based on their values for the custom field. */
  filter?: boolean;
}
