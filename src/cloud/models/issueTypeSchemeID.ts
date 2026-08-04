import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of an issue type scheme. */

export const IssueTypeSchemeIDSchema = apiObject({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.string(),
});

export type IssueTypeSchemeID = z.infer<typeof IssueTypeSchemeIDSchema>;
