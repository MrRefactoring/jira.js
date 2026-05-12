import { z } from 'zod';
import { GetPermissionHolderResponseSchema } from '#/models/getPermissionHolderResponse';

export const GetPermissionResponseSchema = z.object({
  holder: GetPermissionHolderResponseSchema.optional(),
  /** The permission type. This is "View" or "Edit". */
  type: z.enum(['View', 'Edit']),
});

export type GetPermissionResponse = z.infer<typeof GetPermissionResponseSchema>;
