import { z } from 'zod';
import { apiObject } from '#/core';
/** Associated issue type screen scheme and project. */

export const IssueTypeScreenSchemeProjectAssociationSchema = apiObject({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string().optional(),
  /** The ID of the project. */
  projectId: z.string().optional(),
});

export type IssueTypeScreenSchemeProjectAssociation = z.infer<typeof IssueTypeScreenSchemeProjectAssociationSchema>;
