import { z } from 'zod';

export const GetScreensForFieldParametersSchema = z.object({
  /** The ID of the field to return screens for. */
  fieldId: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about screens in the response. This parameter accepts `tab` which returns details about the screen tabs
   * the field is used in.
   */
  expand: z.string().optional(),
});

export type GetScreensForFieldParameters = z.infer<typeof GetScreensForFieldParametersSchema>;
