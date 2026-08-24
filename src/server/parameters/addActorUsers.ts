import { z } from 'zod';
import { ActorsMapSchema } from '../models';

export const AddActorUsersSchema = z.object(ActorsMapSchema.shape).extend({
  /** The project id or project key */
  projectIdOrKey: z.string(),
  /** The project role id */
  id: z.number(),
});

export type AddActorUsers = z.input<typeof AddActorUsersSchema>;
