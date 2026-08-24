import { z } from 'zod';

export const GetOrganizationSchema = z.object({
  /** The ID of the organization. */
  organizationId: z.string(),
});

export type GetOrganization = z.input<typeof GetOrganizationSchema>;
