import { z } from 'zod';
import { UserSchema } from './user';

/**
 * A paginated list of users sharing the filter. This includes users that are members of the groups or can browse the
 * projects that the filter is shared with.
 */
export const UserListSchema = z
  .object({
    /** The index of the last item returned on the page. */
    'end-index': z.number().int().optional(),
    /** The list of items. */
    items: z.array(UserSchema).optional(),
    /** The maximum number of results that could be on the page. */
    'max-results': z.number().int().optional(),
    /** The number of items on the page. */
    size: z.number().int().optional(),
    /** The index of the first item returned on the page. */
    'start-index': z.number().int().optional(),
  })
  .transform(val => ({
    endIndex: val['end-index'],
    items: val['items'],
    maxResults: val['max-results'],
    size: val['size'],
    startIndex: val['start-index'],
  }));

export type UserList = z.infer<typeof UserListSchema>;
