import { z } from 'zod';

export const GetServiceDeskByIdSchema = z.object({
  /**
   * The ID of the service desk to return. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
});

export type GetServiceDeskById = z.input<typeof GetServiceDeskByIdSchema>;
