import { z } from 'zod';

export const RemoveGroupParametersSchema = z.object({
  groupname: z.string().optional(),
  /** The ID of the group. This parameter cannot be used with the `groupname` parameter. */
  groupId: z.string().optional(),
  /**
   * As a group's name can change, use of `swapGroupId` is recommended to identify a group. The group to transfer
   * restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and
   * worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter.
   */
  swapGroup: z.string().optional(),
  /**
   * The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are
   * not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the
   * `swapGroup` parameter.
   */
  swapGroupId: z.string().optional(),
});

export type RemoveGroupParameters = z.infer<typeof RemoveGroupParametersSchema>;
