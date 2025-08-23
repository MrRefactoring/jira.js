import { z } from 'zod';

/** Issue type scheme with a list of the projects that use it. */
export const IssueTypeSchemeProjectsSchema = z.object({
  /** Details of an issue type scheme. */
  issueTypeScheme: z.unknown(),
  /** The IDs of the projects using the issue type scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeSchemeProjects = z.infer<typeof IssueTypeSchemeProjectsSchema>;
