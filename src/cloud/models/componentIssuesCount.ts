import { z } from 'zod';
import { apiObject } from '#/core';
/** Count of issues assigned to a component. */

export const ComponentIssuesCountSchema = apiObject({
  /** The count of issues assigned to a component. */
  issueCount: z.number().optional(),
  /** The URL for this count of issues for a component. */
  self: z.string().url().optional(),
});

export type ComponentIssuesCount = z.infer<typeof ComponentIssuesCountSchema>;
