import { z } from 'zod';

export const PreviewCleanUpOrganizationsSchema = z.object({
  /**
   * If true, in addition, preview the deletion of organizations that are not attached to any projects. Default is
   * false.
   */
  deleteDetachedOrganizations: z.string().optional(),
  /** If true, in addition, preview the deletion of organizations that have no active users. Default is false. */
  deleteOrganizationsWithInactiveUsers: z.string().optional(),
});

export type PreviewCleanUpOrganizations = z.input<typeof PreviewCleanUpOrganizationsSchema>;
