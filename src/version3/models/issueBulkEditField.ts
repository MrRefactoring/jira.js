export interface IssueBulkEditField {
  /** Description of the field. */
  description?: string;
  /** A list of options related to the field, applicable in contexts where multiple selections are allowed. */
  fieldOptions?: unknown[];
  /** The unique ID of the field. */
  id?: string;
  /** Indicates whether the field is mandatory for the operation. */
  isRequired?: boolean;
  /** Specifies supported actions (like add, replace, remove) on multi-select fields via an enum. */
  multiSelectFieldOptions?: ('ADD' | 'REMOVE' | 'REPLACE' | 'REMOVE_ALL' | string)[];
  /** The display name of the field. */
  name?: string;
  /** A URL to fetch additional data for the field */
  searchUrl?: string;
  /** The type of the field. */
  type?: string;
  /** A message indicating why the field is unavailable for editing. */
  unavailableMessage?: string;
}
