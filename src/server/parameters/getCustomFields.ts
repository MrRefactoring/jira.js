import { z } from 'zod';

export const GetCustomFieldsSchema = z.object({
  /** The column by which to sort the returned custom fields. */
  sortColumn: z.string().optional(),
  /** A list of custom field types to filter the custom fields. */
  types: z.string().optional(),
  /** A query string used to search custom fields. */
  search: z.string().optional(),
  /** The maximum number of custom fields to return. */
  maxResults: z.string().optional(),
  /** The order in which to sort the returned custom fields. */
  sortOrder: z.string().optional(),
  /** A list of screen IDs to filter the custom fields. */
  screenIds: z.string().optional(),
  /** The last value update to filter the custom fields. */
  lastValueUpdate: z.string().optional(),
  /** A list of project IDs to filter the custom fields. */
  projectIds: z.string().optional(),
  /** The starting index of the returned custom fields. */
  startAt: z.string().optional(),
});

export type GetCustomFields = z.input<typeof GetCustomFieldsSchema>;
