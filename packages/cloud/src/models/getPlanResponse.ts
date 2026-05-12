import { z } from 'zod';
import { GetCrossProjectReleaseResponseSchema } from '#/models/getCrossProjectReleaseResponse';
import { GetCustomFieldResponseSchema } from '#/models/getCustomFieldResponse';
import { GetExclusionRulesResponseSchema } from '#/models/getExclusionRulesResponse';
import { GetIssueSourceResponseSchema } from '#/models/getIssueSourceResponse';
import { GetPermissionResponseSchema } from '#/models/getPermissionResponse';
import { GetSchedulingResponseSchema } from '#/models/getSchedulingResponse';

export const GetPlanResponseSchema = z.object({
  /** The cross-project releases included in the plan. */
  crossProjectReleases: z.array(GetCrossProjectReleaseResponseSchema).optional(),
  /** The custom fields for the plan. */
  customFields: z.array(GetCustomFieldResponseSchema).optional(),
  exclusionRules: GetExclusionRulesResponseSchema.optional(),
  /** The plan ID. */
  id: z.number(),
  /** The issue sources included in the plan. */
  issueSources: z.array(GetIssueSourceResponseSchema).optional(),
  /** The date when the plan was last saved in UTC. */
  lastSaved: z.string().optional(),
  /** The account ID of the plan lead. */
  leadAccountId: z.string().optional(),
  /** The plan name. */
  name: z.string().optional(),
  /** The permissions for the plan. */
  permissions: z.array(GetPermissionResponseSchema).optional(),
  scheduling: GetSchedulingResponseSchema.optional(),
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: z.enum(['Active', 'Trashed', 'Archived']),
});

export type GetPlanResponse = z.infer<typeof GetPlanResponseSchema>;
