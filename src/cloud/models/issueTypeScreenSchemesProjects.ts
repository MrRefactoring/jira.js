import { z } from 'zod';
import { apiObject } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { IssueTypeScreenSchemeSchema } from './issueTypeScreenScheme';

/** Issue type screen scheme with a list of the projects that use it. */
export const IssueTypeScreenSchemesProjectsSchema = apiObject({
  issueTypeScreenScheme: requiredInResponse(IssueTypeScreenSchemeSchema),
  /** The IDs of the projects using the issue type screen scheme. */
  projectIds: z.array(z.string()),
});

export type IssueTypeScreenSchemesProjects = z.infer<typeof IssueTypeScreenSchemesProjectsSchema>;
