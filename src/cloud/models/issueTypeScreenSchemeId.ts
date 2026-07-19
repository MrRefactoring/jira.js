import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of an issue type screen scheme. */

export const IssueTypeScreenSchemeIdSchema = apiObject({
  /** The ID of the issue type screen scheme. */
  id: z.string(),
});

export type IssueTypeScreenSchemeId = z.infer<typeof IssueTypeScreenSchemeIdSchema>;
