import { z } from 'zod';

export const GetRequestTypesSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** Filter results where the group ID of the request type matches `groupId` */
  groupId: z.string().optional(),
  /** Filter request type by restriction status. It can be OPEN, RESTRICTED or both separated by a comma. */
  restrictionStatus: z.string().optional(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetRequestTypes = z.input<typeof GetRequestTypesSchema>;
