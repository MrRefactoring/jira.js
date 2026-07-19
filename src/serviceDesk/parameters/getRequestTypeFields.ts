import { z } from 'zod';

export const GetRequestTypeFieldsSchema = z.object({
  /**
   * The ID of the service desk containing the request types whose fields are to be returned. This can alternatively
   * be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  /** The ID of the request types whose fields are to be returned. */
  requestTypeId: z.number(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#expansion) to include additional
   * information in the response. This parameter accepts `hiddenFields` that returns hidden fields associated with the
   * request type.
   */
  expand: z.array(z.string()).optional(),
});

export type GetRequestTypeFields = z.input<typeof GetRequestTypeFieldsSchema>;
