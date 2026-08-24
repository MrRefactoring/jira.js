import { z } from 'zod';

export const GetOrganizationsSchema = z.object({
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetOrganizations = z.input<typeof GetOrganizationsSchema>;
