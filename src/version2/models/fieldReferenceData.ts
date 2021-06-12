/** Details of a field that can be used in advanced searches. */
export interface FieldReferenceData {
  /** The field identifier. */
  value?: string;
  /**
   * The display name contains the following:
   *
   * For system fields, the field name. For example, `Summary`. for collapsed custom fields, the field name followed by
   * a hyphen and then the field name and field type. For example, `Component - Component[Dropdown]`. for other custom
   * fields, the field name followed by a hyphen and then the custom field ID. For example, `Component - cf[10061]`.
   */
  displayName?: string;
  /** Whether the field can be used in a query's `ORDER BY` clause. */
  orderable?: string;
  /** Whether the content of this field can be searched. */
  searchable?: string;
  /** Whether the field provide auto-complete suggestions. */
  auto?: string;
  /** If the item is a custom field, the ID of the custom field. */
  cfid?: string;
  /** The valid search operators for the field. */
  operators?: string[];
  /** The data types of items in the field. */
  types?: string[];
}
