import { z } from 'zod';
import { apiObject } from '#/core';
import { CreateCrossProjectReleaseRequestSchema } from './createCrossProjectReleaseRequest';
import { CreateCustomFieldRequestSchema } from './createCustomFieldRequest';
import { CreateExclusionRulesRequestSchema } from './createExclusionRulesRequest';
import { CreateIssueSourceRequestSchema } from './createIssueSourceRequest';
import { CreatePermissionRequestSchema } from './createPermissionRequest';
import { CreateSchedulingRequestSchema } from './createSchedulingRequest';

export const CreatePlanRequestSchema = apiObject({
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
