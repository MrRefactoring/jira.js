import type { UsersOrganizationUpdate } from '../models';

export interface RemoveUsersFromOrganization extends UsersOrganizationUpdate {
  /** The ID of the organization. */
  organizationId: number;
}
