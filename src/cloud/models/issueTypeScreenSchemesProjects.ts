import { z } from 'zod';
import { apiObject, requireResponseKeys } from '#/core';
import { IssueTypeScreenSchemeSchema } from './issueTypeScreenScheme';

/** Issue type screen scheme with a list of the projects that use it. */
export const IssueTypeScreenSchemesProjectsSchema = requireResponseKeys(
  apiObject({
    issueTypeScreenScheme: IssueTypeScreenSchemeSchema.optional(),
    /** The IDs of the projects using the issue type screen scheme. */
    projectIds: z.array(z.string()),
  }),
  ['issueTypeScreenScheme'],
);

export type IssueTypeScreenSchemesProjects = z.infer<typeof IssueTypeScreenSchemesProjectsSchema>;
