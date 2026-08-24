import { z } from 'zod';

export const GetRequestTypeByIdSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** The id of the request type. */
  requestTypeId: z.string(),
  /** Filter request type by restriction status. It can be OPEN, RESTRICTED or both separated by a comma. */
  restrictionStatus: z.string().optional(),
});

export type GetRequestTypeById = z.input<typeof GetRequestTypeByIdSchema>;
