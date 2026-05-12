import { z } from 'zod';

export const DeleteIssueTypePropertySchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /**
   * The key of the property. Use [Get issue type property
   * keys](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issuetype/#api-rest-api-3-issuetype-issueTypeId-properties-get)
   * to get a list of all issue type property keys.
   */
  propertyKey: z.string(),
});

export type DeleteIssueTypeProperty = z.input<typeof DeleteIssueTypePropertySchema>;
