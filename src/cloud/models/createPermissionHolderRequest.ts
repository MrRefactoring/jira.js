import { z } from 'zod';
import { apiObject } from '#/core';

export const CreatePermissionHolderRequestSchema = apiObject({
  /** The permission holder type. This must be "Group" or "AccountId". */
  type: z.enum(['Group', 'AccountId']),
  /**
   * The permission holder value. This must be a group name if the type is "Group" or an account ID if the type is
   * "AccountId".
   */
  value: z.string(),
});

export type CreatePermissionHolderRequest = z.infer<typeof CreatePermissionHolderRequestSchema>;
