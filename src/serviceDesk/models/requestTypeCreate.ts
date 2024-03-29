export interface RequestTypeCreate {
  /** ID of the request type to add to the service desk. */
  issueTypeId?: string;
  /** Name of the request type on the service desk. */
  name?: string;
  /** Description of the request type on the service desk. */
  description?: string;
  /** Help text for the request type on the service desk. */
  helpText?: string;
}
