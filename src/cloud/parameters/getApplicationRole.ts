import { z } from 'zod';

export const GetApplicationRoleSchema = z.object({
  /**
   * The key of the application role. Use the [Get all application
   * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-applicationrole/#api-rest-api-3-applicationrole-get)
   * operation to get the key for each application role.
   */
  key: z.string(),
});

export type GetApplicationRole = z.input<typeof GetApplicationRoleSchema>;
