import { z } from 'zod';

export const DeleteOrganizationSchema = z.object({
  /** The ID of the organization. */
  organizationId: z.string(),
});

export type DeleteOrganization = z.input<typeof DeleteOrganizationSchema>;
