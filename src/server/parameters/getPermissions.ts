import { z } from 'zod';

export const GetPermissionsSchema = z.object({
  /** Id of the issue to scope returned permissions for. */
  issueId: z.string().optional(),
  /** Key of project to scope returned permissions for. */
  projectKey: z.string().optional(),
  /** Key of the issue to scope returned permissions for. */
  issueKey: z.string().optional(),
  /** Id of project to scope returned permissions for. */
  projectId: z.string().optional(),
});

export type GetPermissions = z.input<typeof GetPermissionsSchema>;
