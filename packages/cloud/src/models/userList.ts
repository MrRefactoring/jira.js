import { z } from 'zod';
import { DashboardUserSchema } from '#/models/dashboardUser';

/**
 * A paginated list of users sharing the filter. This includes users that are members of the groups or can browse the
 * projects that the filter is shared with.
 */
export const UserListSchema = z.object({
  /** The index of the last item returned on the page. */
  'end-index': z.number().optional(),
  /** The list of items. */
  items: z.array(DashboardUserSchema).optional(),
  /** The maximum number of results that could be on the page. */
  'max-results': z.number().optional(),
  /** The number of items on the page. */
  size: z.number().optional(),
  /** The index of the first item returned on the page. */
  'start-index': z.number().optional(),
});

export type UserList = z.infer<typeof UserListSchema>;
