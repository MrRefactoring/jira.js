import { z } from 'zod';
import { ProjectRoleActorsUpdateSchema } from '../models';

export const SetActorsSchema = z
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
  .extend(ProjectRoleActorsUpdateSchema.shape);

export type SetActors = z.input<typeof SetActorsSchema>;
