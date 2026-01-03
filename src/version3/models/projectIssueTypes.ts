import { z } from 'zod';
import { ProjectIdSchema } from './projectId';

/**
 * Use the optional `workflows.usages` expand instead to get information about the projects and issue types associated
 * with the requested workflows.
 *
 * @deprecated See the deprecation notice: https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298
 */
export const ProjectIssueTypesSchema = z.object({
  project: ProjectIdSchema.optional(),
  issueTypes: z.array(z.string()).optional(),
});

export type ProjectIssueTypes = z.infer<typeof ProjectIssueTypesSchema>;
