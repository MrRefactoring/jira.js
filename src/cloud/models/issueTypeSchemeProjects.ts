import { z } from 'zod';
import { apiObject } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { IssueTypeSchemeSchema } from './issueTypeScheme';

/** Issue type scheme with a list of the projects that use it. */
export const IssueTypeSchemeProjectsSchema = apiObject({
  issueTypeScheme: requiredInResponse(IssueTypeSchemeSchema),
  /** The IDs of the projects using the issue type scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeSchemeProjects = z.infer<typeof IssueTypeSchemeProjectsSchema>;
