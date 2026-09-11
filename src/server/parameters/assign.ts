import { z } from 'zod';
import { UserSchema } from '../models';

export const AssignSchema = z.object(UserSchema.shape).extend({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type Assign = z.input<typeof AssignSchema>;
