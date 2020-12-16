export interface DeleteCustomFieldOption {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context from which an option should be deleted. */
  contextId: number;
  /** The ID of the option to delete. */
  optionId: number;
}
