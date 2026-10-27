import { z } from 'zod';

export const GetRequestTypeByIdSchema = z.object({
  /**
   * The ID of the service desk whose customer request type is to be returned. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  /** The ID of the customer request type to be returned. */
  requestTypeId: z.string(),
  expand: z.array(z.string()).optional(),
});

export type GetRequestTypeById = z.input<typeof GetRequestTypeByIdSchema>;
