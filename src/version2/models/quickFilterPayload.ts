/** The payload for defining quick filters */
export interface QuickFilterPayload {
  /** The description of the quick filter */
  description?: string;
  /** The jql query for the quick filter */
  jqlQuery?: string;
  /** The name of the quick filter */
  name?: string;
}
