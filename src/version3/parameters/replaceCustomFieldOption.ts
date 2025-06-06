export interface ReplaceCustomFieldOption {
  /** The ID of the option that will replace the currently selected option. */
  replaceWith?: number;
  /** A JQL query that specifies the issues to be updated. For example, _project=10000_. */
  jql?: string;
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the option to be deselected. */
  optionId: number;
  /** The ID of the context. */
  contextId: number;
}
