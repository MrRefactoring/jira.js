import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an issue type screen scheme. */

export const IssueTypeScreenSchemeSchema = apiObject({
  /** The description of the issue type screen scheme. */
  description: z.string().optional(),
  /** The ID of the issue type screen scheme. */
  id: z.string(),
  /** The name of the issue type screen scheme. */
  name: z.string(),
  projects: z.record(z.string(), z.any()).optional(),
});

export type IssueTypeScreenScheme = z.infer<typeof IssueTypeScreenSchemeSchema>;
