import { z } from 'zod';

export const GetPermissionHolderResponseSchema = z.object({
  /** The permission holder type. This is "Group" or "AccountId". */
  type: z.enum(['Group', 'AccountId']),
  /**
   * The permission holder value. This is a group name if the type is "Group" or an account ID if the type is
   * "AccountId".
   */
  value: z.string(),
});

export type GetPermissionHolderResponse = z.infer<typeof GetPermissionHolderResponseSchema>;
