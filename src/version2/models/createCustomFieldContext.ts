/** The details of a created custom field context. */
export interface CreateCustomFieldContext {
  /** The ID of the context. */
  id?: string;
  /** The name of the context. */
  name: string;
  /** The description of the context. */
  description?: string;
  /** The list of project IDs associated with the context. If the list is empty, the context is global. */
  projectIds?: string[];
  /** The list of issue types IDs for the context. If the list is empty, the context refers to all issue types. */
  issueTypeIds?: string[];
}
