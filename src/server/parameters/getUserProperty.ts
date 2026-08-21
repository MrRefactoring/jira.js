import { z } from 'zod';

export const GetUserPropertySchema = z.object({
  /** The key of the user's property */
  propertyKey: z.string(),
  /** Key of the user whose property is to be returned */
  userKey: z.string().optional(),
  /** Username of the user whose property is to be returned */
  username: z.string().optional(),
});

export type GetUserProperty = z.input<typeof GetUserPropertySchema>;
