import { ProjectRoleActorsUpdateBean } from '../models';

export interface SetActors extends ProjectRoleActorsUpdateBean {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
  id: number;
}
