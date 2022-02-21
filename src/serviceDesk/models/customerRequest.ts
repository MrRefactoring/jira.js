import { CustomerRequestActions } from './customerRequestActions';
import { CustomerRequestFieldValue } from './customerRequestFieldValue';
import { CustomerRequestLink } from './customerRequestLink';
import { CustomerRequestStatus } from './customerRequestStatus';
import { Date } from './date';
import { PagedAttachment } from './pagedAttachment';
import { PagedComment } from './pagedComment';
import { PagedCustomerRequestStatus } from './pagedCustomerRequestStatus';
import { PagedSlaInformation } from './pagedSlaInformation';
import { PagedUser } from './pagedUser';
import { RequestType } from './requestType';
import { ServiceDesk } from './serviceDesk';
import { User } from './user';

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
