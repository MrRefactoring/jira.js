import { z } from 'zod';

export const CleanUpOrganizationsSchema = z.object({
  /** If true, in addition, delete organizations that are not attached to any projects. */
  deleteDetachedOrganizations: z.string().optional(),
  /** If true, in addition, delete organizations that have no active users. */
  deleteOrganizationsWithInactiveUsers: z.string().optional(),
});

export type CleanUpOrganizations = z.input<typeof CleanUpOrganizationsSchema>;
