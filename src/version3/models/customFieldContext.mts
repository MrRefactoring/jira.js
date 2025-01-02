/** The details of a custom field context. */
export interface CustomFieldContext {
  /** The ID of the context. */
  id: string;
  /** The name of the context. */
  name: string;
  /** The description of the context. */
  description: string;
  /** Whether the context is global. */
  isGlobalContext: boolean;
  /** Whether the context apply to all issue types. */
  isAnyIssueType: boolean;
}
