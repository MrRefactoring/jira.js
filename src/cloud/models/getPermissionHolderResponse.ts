import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const GetPermissionHolderResponseSchema = apiObject({
  /** The permission holder type. This is "Group" or "AccountId". */
  type: openEnum(['Group', 'AccountId']),
  /**
   * The permission holder value. This is a group name if the type is "Group" or an account ID if the type is
   * "AccountId".
   */
  value: z.string(),
});

export type GetPermissionHolderResponse = z.infer<typeof GetPermissionHolderResponseSchema>;
