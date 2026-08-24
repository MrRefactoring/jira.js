import { z } from 'zod';

export const DeleteActorSchema = z.object({
  /** The project id or project key */
  projectIdOrKey: z.string(),
  /** The project role id */
  id: z.number(),
  /** The user name of the user to remove from the project role. Use either user or group, but not both */
  user: z.string().optional(),
  /** The group name to remove from the project role. Use either user or group, but not both */
  group: z.string().optional(),
});

export type DeleteActor = z.input<typeof DeleteActorSchema>;
