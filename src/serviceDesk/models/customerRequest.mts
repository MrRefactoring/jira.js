import { CustomerRequestActions } from './customerRequestActions.mjs';
import { CustomerRequestFieldValue } from './customerRequestFieldValue.mjs';
import { CustomerRequestLink } from './customerRequestLink.mjs';
import { CustomerRequestStatus } from './customerRequestStatus.mjs';
import { Date } from './date.mjs';
import { PagedAttachment } from './pagedAttachment.mjs';
import { PagedComment } from './pagedComment.mjs';
import { PagedCustomerRequestStatus } from './pagedCustomerRequestStatus.mjs';
import { PagedSlaInformation } from './pagedSlaInformation.mjs';
import { PagedUser } from './pagedUser.mjs';
import { RequestType } from './requestType.mjs';
import { ServiceDesk } from './serviceDesk.mjs';
import { User } from './user.mjs';

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
