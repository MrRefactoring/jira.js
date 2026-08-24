import { z } from 'zod';

export const GetPermissionsByRequestTypeIdSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** The id of the request type. */
  requestTypeId: z.string(),
});

export type GetPermissionsByRequestTypeId = z.input<typeof GetPermissionsByRequestTypeIdSchema>;
