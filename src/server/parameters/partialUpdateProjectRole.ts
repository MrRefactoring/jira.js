import { z } from 'zod';
import { CreateUpdateRoleRequestSchema } from '../models';

export const PartialUpdateProjectRoleSchema = z.object(CreateUpdateRoleRequestSchema.shape).extend({
  /** The role id */
  id: z.number(),
});

export type PartialUpdateProjectRole = z.input<typeof PartialUpdateProjectRoleSchema>;
