import { z } from 'zod';
import { CreateUpdateRoleRequestSchema } from '../models';

export const PartialUpdateProjectRoleSchema = z
  .object({
    /**
     * The ID of the project role. Use [Get all project
     * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) to
     * get a list of project role IDs.
     */
    id: z.number(),
  })
  .extend(CreateUpdateRoleRequestSchema.shape);

export type PartialUpdateProjectRole = z.input<typeof PartialUpdateProjectRoleSchema>;
