import { z } from 'zod';

export const IdSchema = z.object({
  /**
   * The ID of the permission scheme to associate with the project. Use the [Get all permission
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-rest-api-3-permissionscheme-get)
   * resource to get a list of permission scheme IDs.
   */
  id: z.number(),
});

export type Id = z.infer<typeof IdSchema>;
