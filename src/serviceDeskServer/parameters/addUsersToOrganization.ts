import { z } from 'zod';
import { UsersOrganizationUpdateSchema } from '../models';

export const AddUsersToOrganizationSchema = z.object(UsersOrganizationUpdateSchema.shape).extend({
  /** The ID of the organization. */
  organizationId: z.string(),
});

export type AddUsersToOrganization = z.input<typeof AddUsersToOrganizationSchema>;
