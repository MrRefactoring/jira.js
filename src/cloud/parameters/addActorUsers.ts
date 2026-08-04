import { z } from 'zod';
import { ActorsMapSchema } from '../models';

export const AddActorUsersSchema = z
  .object({
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: z.string(),
    /**
     * The ID of the project role. Use [Get all project
     * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) to
     * get a list of project role IDs.
     */
    id: z.number(),
  })
  .extend(ActorsMapSchema.shape);

export type AddActorUsers = z.input<typeof AddActorUsersSchema>;
