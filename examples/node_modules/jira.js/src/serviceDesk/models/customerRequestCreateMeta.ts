import type { RequestTypeField } from './requestTypeField';

export interface CustomerRequestCreateMeta {
  /** List of the fields included in this request. */
  requestTypeFields?: RequestTypeField[];
  /** Flag indicating if a request can be raised on behalf of another user (true) or not. */
  canRaiseOnBehalfOf?: boolean;
  /** Flag indicating if participants can be added to a request (true) or not. */
  canAddRequestParticipants?: boolean;
}
