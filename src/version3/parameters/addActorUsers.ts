import { ActorsMap } from '../models';

export interface AddActorUsers extends ActorsMap {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
  id: number;
}
