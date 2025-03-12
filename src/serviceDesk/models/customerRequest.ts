import type { CustomerRequestActions } from './customerRequestActions';
import type { CustomerRequestFieldValue } from './customerRequestFieldValue';
import type { CustomerRequestLink } from './customerRequestLink';
import type { CustomerRequestStatus } from './customerRequestStatus';
import type { Date } from './date';
import type { PagedAttachment } from './pagedAttachment';
import type { PagedComment } from './pagedComment';
import type { PagedCustomerRequestStatus } from './pagedCustomerRequestStatus';
import type { PagedSlaInformation } from './pagedSlaInformation';
import type { PagedUser } from './pagedUser';
import type { RequestType } from './requestType';
import type { ServiceDesk } from './serviceDesk';
import type { User } from './user';

export interface CustomerRequest {
  /** ID of the request, as the peer issue ID. */
  issueId?: string;
  /** Key of the request, as the peer issue key. */
  issueKey?: string;
  /** ID of the request type for the request. */
  requestTypeId?: string;
  requestType?: RequestType;
  /** ID of the service desk the request belongs to. */
  serviceDeskId?: string;
  serviceDesk?: ServiceDesk;
  createdDate?: Date;
  reporter?: User;
  /** JSON map of Jira field IDs and their values representing the content of the request. */
  requestFieldValues?: CustomerRequestFieldValue[];
  currentStatus?: CustomerRequestStatus;
  status?: PagedCustomerRequestStatus;
  participants?: PagedUser;
  sla?: PagedSlaInformation;
  attachments?: PagedAttachment;
  comments?: PagedComment;
  actions?: CustomerRequestActions;
  /** List of items that can be expanded in the response by specifying the expand query parameter. */
  Expands?: string[];
  Links?: CustomerRequestLink;
}
