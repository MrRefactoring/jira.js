import { z } from 'zod';

export const GetProjectRoleDetailsParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /** Whether the roles should be filtered to include only those the user is assigned to. */
  currentMember: z.boolean().optional(),
  excludeConnectAddons: z.boolean().optional(),
});

export type GetProjectRoleDetailsParameters = z.infer<typeof GetProjectRoleDetailsParametersSchema>;
