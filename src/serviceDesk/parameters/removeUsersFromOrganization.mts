import { UsersOrganizationUpdate } from '../models/index.mjs';

export interface RemoveUsersFromOrganization extends UsersOrganizationUpdate {
  /** The ID of the organization. */
  organizationId: number;
}
