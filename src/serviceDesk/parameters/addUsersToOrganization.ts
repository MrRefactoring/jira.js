import type { UsersOrganizationUpdate } from '../models/index.js';

export interface AddUsersToOrganization extends UsersOrganizationUpdate {
  /** The ID of the organization. */
  organizationId: number;
}
