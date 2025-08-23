import { z } from 'zod';

/** Issue type screen scheme with a list of the projects that use it. */
export const IssueTypeScreenSchemesProjectsSchema = z.object({
  /** Details of an issue type screen scheme. */
  issueTypeScreenScheme: z.unknown(),
  /** The IDs of the projects using the issue type screen scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeScreenSchemesProjects = z.infer<typeof IssueTypeScreenSchemesProjectsSchema>;
