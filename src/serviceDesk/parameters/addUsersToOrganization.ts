import { z } from 'zod';
import { UsersOrganizationUpdateSchema } from '../models';

export const AddUsersToOrganizationSchema = z.object({
  /** The ID of the organization. */
  organizationId: z.number(),
  body: UsersOrganizationUpdateSchema,
});

export type AddUsersToOrganization = z.input<typeof AddUsersToOrganizationSchema>;
