import { z } from 'zod';
import { UpdateUserToGroupSchema } from '../models';

export const AddUserToGroupSchema = z.object(UpdateUserToGroupSchema.shape).extend({
  /** A name of requested group. */
  groupname: z.string(),
});

export type AddUserToGroup = z.input<typeof AddUserToGroupSchema>;
