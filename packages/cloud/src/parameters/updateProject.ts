import { z } from 'zod';
import { UpdateProjectDetailsSchema } from '../models';

export const UpdateProjectSchema = z
  .object({
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: z.string(),
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information in the response. This parameter accepts a comma-separated list. Note that the project description,
     * issue types, and project lead are included in all responses by default. Expand options include:
     *
     * - `description` The project description.
     * - `issueTypes` The issue types associated with the project.
     * - `lead` The project lead.
     * - `projectKeys` All project keys associated with the project.
     */
    expand: z
      .union([
        z.string(),
        z.array(z.string()),
        z.enum(['description', 'issueTypes', 'lead', 'projectKeys']),
        z.array(z.enum(['description', 'issueTypes', 'lead', 'projectKeys'])),
      ])
      .optional(),
  })
  .extend(UpdateProjectDetailsSchema.shape);

export type UpdateProject = z.input<typeof UpdateProjectSchema>;
