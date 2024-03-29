export interface GetRequestTypeFields {
  /**
   * The ID of the service desk containing the request types whose fields are to be returned. This can alternatively be
   * a [project identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The ID of the request types whose fields are to be returned. */
  requestTypeId: number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#expansion) to include additional
   * information in the response. This parameter accepts `hiddenFields` that returns hidden fields associated with the
   * request type.
   */
  expand?: string[];
}
