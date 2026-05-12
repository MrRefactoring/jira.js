import { z } from 'zod';

export const GetScreensForFieldSchema = z.object({
  /** The ID of the field to return screens for. */
  fieldId: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about screens in the response. This parameter accepts `tab` which returns details about the screen tabs
   * the field is used in.
   */
  expand: z.union([z.string(), z.array(z.string()), z.enum(['tab']), z.array(z.enum(['tab']))]).optional(),
});

export type GetScreensForField = z.input<typeof GetScreensForFieldSchema>;
