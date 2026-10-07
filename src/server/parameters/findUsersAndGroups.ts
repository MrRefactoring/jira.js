import { z } from 'zod';

export const FindUsersAndGroupsSchema = z.object({
  /** The list of issue type ids to further restrict the search */
  issueTypeId: z.string().optional(),
  /** The maximum number of users to return */
  maxResults: z.number().optional(),
  /** A string used to search username, Name or e-mail address */
  query: z.string(),
  /** Show avatar */
  showAvatar: z.boolean().optional(),
  /** The list of project ids to further restrict the search */
  projectId: z.string().optional(),
  /** The custom field id */
  fieldId: z.string().optional(),
});

export type FindUsersAndGroups = z.input<typeof FindUsersAndGroupsSchema>;
