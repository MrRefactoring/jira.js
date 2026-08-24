import { z } from 'zod';

export const GetCustomFieldOptionsSchema = z.object({
  /** The maximum number of results to return. */
  maxResults: z.string().optional(),
  /** A list of issue type IDs in a context. */
  issueTypeIds: z.string().optional(),
  /** A string used to filter options. */
  query: z.string().optional(),
  /** Flag to sort options by their names. */
  sortByOptionName: z.string().optional(),
  /** The ID of the custom field. */
  customFieldId: z.string(),
  /** Flag to fetch all options regardless of context, project IDs, or issue type IDs. */
  useAllContexts: z.string().optional(),
  /** The page of options to return. */
  page: z.string().optional(),
  /** A list of project IDs in a context. */
  projectIds: z.string().optional(),
});

export type GetCustomFieldOptions = z.input<typeof GetCustomFieldOptionsSchema>;
