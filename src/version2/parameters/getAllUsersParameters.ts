import { z } from 'zod';

export const GetAllUsersParametersSchema = z.object({
  /** The index of the first item to return. */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return (limited to 1000). */
  maxResults: z.number().int().optional(),
});

export type GetAllUsersParameters = z.infer<typeof GetAllUsersParametersSchema>;
