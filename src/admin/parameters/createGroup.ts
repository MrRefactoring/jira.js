import { z } from 'zod';

export const CreateGroupSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * A directory has a unique ID. Use the [Get directories
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-directory/#api-v2-orgs-orgid-directories-get)
   * to find the directory ID.
   */
  directoryId: z.string(),
  /** Name the group. */
  name: z.string(),
  /** Describe what the group is or what it might be used for. */
  description: z.string().optional(),
});

export type CreateGroup = z.input<typeof CreateGroupSchema>;
