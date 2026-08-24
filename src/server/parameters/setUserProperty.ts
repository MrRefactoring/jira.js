import { z } from 'zod';

export const SetUserPropertySchema = z.object({
  /** The key of the user's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string(),
  /** Key of the user whose property is to be set */
  userKey: z.string().optional(),
  /** Username of the user whose property is to be set */
  username: z.string().optional(),
  body: z.record(z.string(), z.any()),
});

export type SetUserProperty = z.input<typeof SetUserPropertySchema>;
