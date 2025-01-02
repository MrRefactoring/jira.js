import { ActorInput } from '../models/index.mjs';

export interface AddProjectRoleActorsToRole extends ActorInput {
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role
   * IDs.
   */
  id: number;
}
