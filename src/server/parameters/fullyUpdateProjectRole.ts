import { z } from 'zod';
import { CreateUpdateRoleRequestSchema } from '../models';

export const FullyUpdateProjectRoleSchema = z.object(CreateUpdateRoleRequestSchema.shape).extend({
  /** The role id */
  id: z.number(),
});

export type FullyUpdateProjectRole = z.input<typeof FullyUpdateProjectRoleSchema>;
