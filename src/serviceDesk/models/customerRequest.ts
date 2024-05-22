import type { CustomerRequestActions } from './customerRequestActions.js';
import type { CustomerRequestFieldValue } from './customerRequestFieldValue.js';
import type { CustomerRequestLink } from './customerRequestLink.js';
import type { CustomerRequestStatus } from './customerRequestStatus.js';
import type { Date } from './date.js';
import type { PagedAttachment } from './pagedAttachment.js';
import type { PagedComment } from './pagedComment.js';
import type { PagedCustomerRequestStatus } from './pagedCustomerRequestStatus.js';
import type { PagedSlaInformation } from './pagedSlaInformation.js';
import type { PagedUser } from './pagedUser.js';
import type { RequestType } from './requestType.js';
import type { ServiceDesk } from './serviceDesk.js';
import type { User } from './user.js';

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
