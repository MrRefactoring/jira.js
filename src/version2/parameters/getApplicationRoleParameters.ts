import { z } from 'zod';

export const GetApplicationRoleParametersSchema = z.object({
  /**
   * The key of the application role. Use the [Get all application roles](#api-rest-api-2-applicationrole-get) operation
   * to get the key for each application role.
   */
  key: z.string(),
});

export type GetApplicationRoleParameters = z.infer<typeof GetApplicationRoleParametersSchema>;
