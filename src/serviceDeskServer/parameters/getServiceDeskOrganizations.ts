import { z } from 'zod';

export const GetServiceDeskOrganizationsSchema = z.object({
  /** The ID of the service desk. */
  serviceDeskId: z.string(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetServiceDeskOrganizations = z.input<typeof GetServiceDeskOrganizationsSchema>;
