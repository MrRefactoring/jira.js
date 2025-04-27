export interface RequestCreate {
  /** ID of the service desk in which to create the request. */
  serviceDeskId?: string;
  /** ID of the request type for the request. */
  requestTypeId?: string;
  /** JSON map of Jira field IDs and their values representing the content of the request. */
  requestFieldValues?: unknown;
  /** List of customers to participate in the request, as a list of `accountId` values. */
  requestParticipants?: string[];
  /** The `accountId` of the customer that the request is being raised on behalf of. */
  raiseOnBehalfOf?: string;
  /** (Experimental) Shows extra information for the request channel. */
  channel?: string;
}
