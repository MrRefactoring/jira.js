import { z } from 'zod';

export const DeleteUserPropertySchema = z.object({
  /** The key of the user's property */
  propertyKey: z.string(),
  /** Key of the user whose property is to be removed */
  userKey: z.string().optional(),
  /** Username of the user whose property is to be removed */
  username: z.string().optional(),
});

export type DeleteUserProperty = z.input<typeof DeleteUserPropertySchema>;
