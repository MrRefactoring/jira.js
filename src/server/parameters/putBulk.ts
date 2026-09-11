import { z } from 'zod';
import { ApplicationRoleSchema } from '../models';

export const PutBulkSchema = z.object(ApplicationRoleSchema.shape).extend({
  'If-Match': z.string().optional(),
});

export type PutBulk = z.input<typeof PutBulkSchema>;
