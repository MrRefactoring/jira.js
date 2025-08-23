import { z } from 'zod';
import { GetCrossProjectReleaseResponseSchema } from './getCrossProjectReleaseResponse';
import { GetCustomFieldResponseSchema } from './getCustomFieldResponse';
import { GetIssueSourceResponseSchema } from './getIssueSourceResponse';
import { GetPermissionResponseSchema } from './getPermissionResponse';

export const GetPlanResponseSchema = z.object({
  /** The cross-project releases included in the plan. */
  crossProjectReleases: z.array(GetCrossProjectReleaseResponseSchema).optional(),
  /** The custom fields for the plan. */
  customFields: z.array(GetCustomFieldResponseSchema).optional(),
  /** The exclusion rules for the plan. */
  exclusionRules: z.unknown().optional(),
  /** The plan ID. */
  id: z.number().int(),
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
  /** The scheduling settings for the plan. */
  scheduling: z.unknown(),
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: z.enum(['Active', 'Trashed', 'Archived']),
});

export type GetPlanResponse = z.infer<typeof GetPlanResponseSchema>;
