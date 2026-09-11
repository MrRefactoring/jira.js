import { z } from 'zod';
import { UsersOrganizationUpdateSchema } from '../models';

export const RemoveUsersFromOrganizationSchema = z.object(UsersOrganizationUpdateSchema.shape).extend({
  /** The ID of the organization. */
  organizationId: z.string(),
});

export type RemoveUsersFromOrganization = z.input<typeof RemoveUsersFromOrganizationSchema>;
