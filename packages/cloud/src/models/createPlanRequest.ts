import { z } from 'zod';
import { CreateCrossProjectReleaseRequestSchema } from '#/models/createCrossProjectReleaseRequest';
import { CreateCustomFieldRequestSchema } from '#/models/createCustomFieldRequest';
import { CreateExclusionRulesRequestSchema } from '#/models/createExclusionRulesRequest';
import { CreateIssueSourceRequestSchema } from '#/models/createIssueSourceRequest';
import { CreatePermissionRequestSchema } from '#/models/createPermissionRequest';
import { CreateSchedulingRequestSchema } from '#/models/createSchedulingRequest';

export const CreatePlanRequestSchema = z.object({
  /** The cross-project releases to include in the plan. */
  crossProjectReleases: z.array(CreateCrossProjectReleaseRequestSchema).optional(),
  /** The custom fields for the plan. */
  customFields: z.array(CreateCustomFieldRequestSchema).optional(),
  exclusionRules: CreateExclusionRulesRequestSchema.optional(),
  /** The issue sources to include in the plan. */
  issueSources: z.array(CreateIssueSourceRequestSchema),
  /** The account ID of the plan lead. */
  leadAccountId: z.string().optional(),
  /** The plan name. */
  name: z.string().max(255, 'name must be at most 255 characters'),
  /** The permissions for the plan. */
  permissions: z.array(CreatePermissionRequestSchema).optional(),
  scheduling: CreateSchedulingRequestSchema.optional(),
});

export type CreatePlanRequest = z.infer<typeof CreatePlanRequestSchema>;
