/**
 * Default value for a cascading select custom field. */
export interface CustomFieldContextDefaultValueCascadingOption {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default option. */
  optionId: string;
  /** The ID of the default cascading option. */
  cascadingOptionId?: string;
  type: string;
}
