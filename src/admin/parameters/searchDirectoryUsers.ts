import { z } from 'zod';
import { MultiDirectoryUserSearchRequestSchema } from '../models';

export const SearchDirectoryUsersSchema = z.object(MultiDirectoryUserSearchRequestSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * Unique ID associated with a directory. The `-` character can be used to increase the operation scope to all
   * directories the requestor has permission to manage.
   */
  directoryId: z.string(),
});

export type SearchDirectoryUsers = z.input<typeof SearchDirectoryUsersSchema>;
