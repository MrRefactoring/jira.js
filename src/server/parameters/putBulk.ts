import { z } from 'zod';
import { ApplicationRoleSchema } from '../models';

export const PutBulkSchema = z.object({
  'If-Match': z.string().optional(),
  body: z.array(ApplicationRoleSchema).optional(),
});

export type PutBulk = z.input<typeof PutBulkSchema>;
