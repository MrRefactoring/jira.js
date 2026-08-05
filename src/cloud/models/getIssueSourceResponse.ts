import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const GetIssueSourceResponseSchema = apiObject({
  /** The issue source type. This is "Board", "Project" or "Filter". */
  type: openEnum(['Board', 'Project', 'Filter', 'Custom']),
  /**
   * The issue source value. This is a board ID if the type is "Board", a project ID if the type is "Project" or a
   * filter ID if the type is "Filter".
   */
  value: z.number(),
});

export type GetIssueSourceResponse = z.infer<typeof GetIssueSourceResponseSchema>;
