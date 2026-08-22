import { z } from 'zod';

export const GetUserPropertyKeysSchema = z.object({
  /** Key of the user whose properties are to be returned */
  userKey: z.string().optional(),
  /** Username of the user whose properties are to be returned */
  username: z.string().optional(),
});

export type GetUserPropertyKeys = z.input<typeof GetUserPropertyKeysSchema>;
