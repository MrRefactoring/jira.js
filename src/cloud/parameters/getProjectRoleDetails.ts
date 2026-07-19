import { z } from 'zod';

export const GetProjectRoleDetailsSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /** Whether the roles should be filtered to include only those the user is assigned to. */
  currentMember: z.boolean().optional(),
  excludeConnectAddons: z.boolean().optional(),
  /** Do not return the default JSM company-managed space from CSM spaces, or the default CSM roles from JSM spaces. */
  excludeOtherServiceRoles: z.boolean().optional(),
});

export type GetProjectRoleDetails = z.input<typeof GetProjectRoleDetailsSchema>;
