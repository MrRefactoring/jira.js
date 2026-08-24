import { z } from 'zod';
import { ActorInputSchema } from '../models';

export const AddProjectRoleActorsToRoleSchema = z.object(ActorInputSchema.shape).extend({
  /** The role id */
  id: z.number(),
});

export type AddProjectRoleActorsToRole = z.input<typeof AddProjectRoleActorsToRoleSchema>;
