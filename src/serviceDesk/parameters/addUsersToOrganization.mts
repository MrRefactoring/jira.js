import { UsersOrganizationUpdate } from '../models/index.mjs';

export interface AddUsersToOrganization extends UsersOrganizationUpdate {
  /** The ID of the organization. */
  organizationId: number;
}
