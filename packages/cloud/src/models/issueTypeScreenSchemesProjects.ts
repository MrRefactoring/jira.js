import { z } from 'zod';
import { IssueTypeScreenSchemeSchema } from '#/models/issueTypeScreenScheme';

/** Issue type screen scheme with a list of the projects that use it. */
export const IssueTypeScreenSchemesProjectsSchema = z.object({
  issueTypeScreenScheme: IssueTypeScreenSchemeSchema.optional(),
  /** The IDs of the projects using the issue type screen scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeScreenSchemesProjects = z.infer<typeof IssueTypeScreenSchemesProjectsSchema>;
