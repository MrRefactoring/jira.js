import type { ProjectRoleActorsUpdate } from '../models';

export interface SetActors extends ProjectRoleActorsUpdate {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string | number;
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: number;
}
