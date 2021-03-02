import { ActorInputBean } from '../models';

export interface AddProjectRoleActorsToRole extends ActorInputBean {
  /** The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs. */
  id: number;
}
