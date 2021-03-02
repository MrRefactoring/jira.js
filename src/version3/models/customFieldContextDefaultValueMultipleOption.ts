/**
 * Default value for a multi-select custom field. */
export interface CustomFieldContextDefaultValueMultipleOption {
  /** The ID of the context. */
  contextId: string;
  /** The list of IDs of the default options. */
  optionIds: string[];
  type: string;
}
