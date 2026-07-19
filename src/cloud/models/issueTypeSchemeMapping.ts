import { z } from 'zod';
import { apiObject } from '#/core';
/** Issue type scheme item. */

export const IssueTypeSchemeMappingSchema = apiObject({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.string(),
});

export type IssueTypeSchemeMapping = z.infer<typeof IssueTypeSchemeMappingSchema>;
