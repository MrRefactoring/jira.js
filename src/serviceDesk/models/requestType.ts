import type { CustomerRequestCreateMeta } from './customerRequestCreateMeta';
import type { RequestTypeIcon } from './requestTypeIcon';
import type { SelfLink } from './selfLink';

export interface RequestType {
  /** ID for the request type. */
  id?: string;
  /** Short name for the request type. */
  name?: string;
  /** Description of the request type. */
  description?: string;
  /** Help text for the request type. */
  helpText?: string;
  /** ID of the issue type the request type is based upon. */
  issueTypeId?: string;
  /** ID of the service desk the request type belongs to. */
  serviceDeskId?: string;
  /** ID of the customer portal associated with the service desk project. */
  portalId?: string;
  /** List of the request type groups the request type belongs to. */
  groupIds?: string[];
  icon?: RequestTypeIcon;
  fields?: CustomerRequestCreateMeta;
  /** The request type's practice */
  practice?: string;
  /** List of items that can be expanded in the response by specifying the expand query parameter. */
  Expands?: string[];
  Links?: SelfLink;
}
