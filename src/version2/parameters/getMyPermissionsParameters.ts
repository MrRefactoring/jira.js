import { z } from 'zod';

export const GetMyPermissionsParametersSchema = z.object({
  /** The key of project. Ignored if `projectId` is provided. */
  projectKey: z.string().optional(),
  /** The ID of project. */
  projectId: z.string().optional(),
  /** The key of the issue. Ignored if `issueId` is provided. */
  issueKey: z.string().optional(),
  /** The ID of the issue. */
  issueId: z.string().optional(),
  /**
   * A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available
   * permissions, use [Get all permissions](#api-rest-api-2-permissions-get).
   */
  permissions: z.string().optional(),
  projectUuid: z.string().optional(),
  projectConfigurationUuid: z.string().optional(),
  /** The ID of the comment. */
  commentId: z.string().optional(),
});

export type GetMyPermissionsParameters = z.infer<typeof GetMyPermissionsParametersSchema>;
