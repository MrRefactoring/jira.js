import { z } from 'zod';

export const AddGroupSchema = z.object({
  /** The name of the group. */
  name: z.string(),
});

export type AddGroup = z.infer<typeof AddGroupSchema>;
