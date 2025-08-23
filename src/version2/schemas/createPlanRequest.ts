import { z } from 'zod';
import { CreateCrossProjectReleaseRequestSchema } from './createCrossProjectReleaseRequest';
import { CreateCustomFieldRequestSchema } from './createCustomFieldRequest';
import { CreateIssueSourceRequestSchema } from './createIssueSourceRequest';
import { CreatePermissionRequestSchema } from './createPermissionRequest';

export const CreatePlanRequestSchema = z.object({
  /** The cross-project releases to include in the plan. */
  crossProjectReleases: z.array(CreateCrossProjectReleaseRequestSchema).optional(),
  /** The custom fields for the plan. */
  customFields: z.array(CreateCustomFieldRequestSchema).optional(),
  /** The exclusion rules for the plan. */
  exclusionRules: z.unknown().optional(),
  /** The issue sources to include in the plan. */
  issueSources: z.array(CreateIssueSourceRequestSchema),
  /** The account ID of the plan lead. */
  leadAccountId: z.string().optional(),
  /** The plan name. */
  name: z.string(),
  /** The permissions for the plan. */
  permissions: z.array(CreatePermissionRequestSchema).optional(),
  /** The scheduling settings for the plan. */
  scheduling: z.unknown(),
});

export type CreatePlanRequest = z.infer<typeof CreatePlanRequestSchema>;
