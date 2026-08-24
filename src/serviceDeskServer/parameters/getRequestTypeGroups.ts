import { z } from 'zod';

export const GetRequestTypeGroupsSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetRequestTypeGroups = z.input<typeof GetRequestTypeGroupsSchema>;
