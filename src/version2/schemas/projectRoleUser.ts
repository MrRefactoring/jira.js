import { z } from 'zod';

/** Details of the user associated with the role. */
export const ProjectRoleUserSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Returns _unknown_ if the record is deleted and corrupted, for example, as the result of
   * a server import.
   */
  accountId: z.string().optional(),
});

export type ProjectRoleUser = z.infer<typeof ProjectRoleUserSchema>;
