import { z } from 'zod';
import { UserDetailsSchema } from './userDetails';

/**
 * A paged list. To access additional details append `[start-index:end-index]` to the expand request. For example,
 * `?expand=sharedUsers[10:40]` returns a list starting at item 10 and finishing at item 40.
 */
export const PagedListUserDetailsApplicationUserSchema = z
  .object({
    /** The index of the last item returned on the page. */
    'end-index': z.number().int().optional(),
    /** The list of items. */
    items: z.array(UserDetailsSchema).optional(),
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

export type PagedListUserDetailsApplicationUser = z.infer<typeof PagedListUserDetailsApplicationUserSchema>;
