import { z } from 'zod';

export const DeleteIssueTypePropertyParametersSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /**
   * The key of the property. Use [Get issue type property keys](#api-rest-api-2-issuetype-issueTypeId-properties-get)
   * to get a list of all issue type property keys.
   */
  propertyKey: z.string(),
});

export type DeleteIssueTypePropertyParameters = z.infer<typeof DeleteIssueTypePropertyParametersSchema>;
