import { z } from 'zod';
import { UsersOrganizationUpdateSchema } from '../models';

export const RemoveUsersFromOrganizationSchema = z.object({
  /** The ID of the organization. */
  organizationId: z.number(),
  body: UsersOrganizationUpdateSchema,
});

export type RemoveUsersFromOrganization = z.input<typeof RemoveUsersFromOrganizationSchema>;
