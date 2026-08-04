import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeSchemeSchema } from './issueTypeScheme';
/** Issue type scheme with a list of the projects that use it. */

export const IssueTypeSchemeProjectsSchema = apiObject({
  issueTypeScheme: IssueTypeSchemeSchema.optional(),
  /** The IDs of the projects using the issue type scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeSchemeProjects = z.infer<typeof IssueTypeSchemeProjectsSchema>;
