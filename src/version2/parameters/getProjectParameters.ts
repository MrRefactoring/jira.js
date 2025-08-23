import { z } from 'zod';

export const GetProjectParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Note that the project description,
   * issue types, and project lead are included in all responses by default. Expand options include:
   *
   * - `description` The project description.
   * - `issueTypes` The issue types associated with the project.
   * - `lead` The project lead.
   * - `projectKeys` All project keys associated with the project.
   * - `issueTypeHierarchy` The project issue type hierarchy.
   */
  expand: z.string().optional(),
  /** A list of project properties to return for the project. This parameter accepts a comma-separated list. */
  properties: z.array(z.string()).optional(),
});

export type GetProjectParameters = z.infer<typeof GetProjectParametersSchema>;
