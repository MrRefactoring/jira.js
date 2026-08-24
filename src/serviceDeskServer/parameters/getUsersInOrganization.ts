import { z } from 'zod';

export const GetUsersInOrganizationSchema = z.object({
  /** The ID of the organization. */
  organizationId: z.string(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetUsersInOrganization = z.input<typeof GetUsersInOrganizationSchema>;
