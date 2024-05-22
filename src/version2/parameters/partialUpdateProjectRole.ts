import type { CreateUpdateRoleRequest } from '../models/index.js';

export interface PartialUpdateProjectRole extends CreateUpdateRoleRequest {
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: number;
}
