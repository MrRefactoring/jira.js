export interface SearchFieldAssociationSchemeFields {
  /** The starting index of the returned fields. Base index: 0. */
  startAt?: number;
  /** The maximum number of fields to return per page, maximum allowed value is 100. */
  maxResults?: number;
  /** The field IDs to filter by, if empty then all fields belonging to a field association scheme will be returned */
  fieldId?: string[];
  /** The scheme ID to search for child fields */
  id: number;
}
