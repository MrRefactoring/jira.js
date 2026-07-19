import { z } from 'zod';
import { UpdateUserToGroupSchema } from '../models';

export const AddUserToGroupSchema = z
  .object({
    /**
     * As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This
     * parameter cannot be used with the `groupId` parameter.
     */
    groupname: z.string().optional(),
    /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
    groupId: z.string().optional(),
  })
  .extend(UpdateUserToGroupSchema.shape);

export type AddUserToGroup = z.input<typeof AddUserToGroupSchema>;
