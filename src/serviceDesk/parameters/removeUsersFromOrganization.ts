import type { UsersOrganizationUpdate } from '../models/index.js';

export interface RemoveUsersFromOrganization extends UsersOrganizationUpdate {
  /** The ID of the organization. */
  organizationId: number;
}
