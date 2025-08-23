import { z } from 'zod';

export const CreateGroupParametersSchema = z.object({
  /** The name of the group. */
  name: z.string(),
});

export type CreateGroupParameters = z.infer<typeof CreateGroupParametersSchema>;
