import { z } from 'zod';
import { IssueTypeSchemeSchema } from '#/models/issueTypeScheme';

/** Issue type scheme with a list of the projects that use it. */
export const IssueTypeSchemeProjectsSchema = z.object({
  issueTypeScheme: IssueTypeSchemeSchema.optional(),
  /** The IDs of the projects using the issue type scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeSchemeProjects = z.infer<typeof IssueTypeSchemeProjectsSchema>;
