import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueCountSchema = apiObject({
  /** Number of issues. */
  count: z.number().optional(),
});

export type IssueCount = z.infer<typeof IssueCountSchema>;
