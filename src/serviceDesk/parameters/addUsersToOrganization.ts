import { UsersOrganizationUpdate } from '../models';

export interface AddUsersToOrganization extends UsersOrganizationUpdate {
  /** The ID of the organization. */
  organizationId: number;
}
