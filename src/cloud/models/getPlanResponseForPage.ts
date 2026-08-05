import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { GetIssueSourceResponseSchema } from './getIssueSourceResponse';

export const GetPlanResponseForPageSchema = apiObject({
  /** The plan ID. */
  id: z.string(),
  /** The issue sources included in the plan. */
  issueSources: z.array(GetIssueSourceResponseSchema).optional(),
  /** The plan name. */
  name: z.string(),
  /** Default scenario ID. */
  scenarioId: z.string(),
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: openEnum(['Active', 'Trashed', 'Archived']),
});

export type GetPlanResponseForPage = z.infer<typeof GetPlanResponseForPageSchema>;
