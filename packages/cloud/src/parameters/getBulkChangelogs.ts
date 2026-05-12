import { z } from 'zod';
import { BulkChangelogRequestSchema } from '../models';

export const GetBulkChangelogsSchema = z.object({}).extend(BulkChangelogRequestSchema.shape);

export type GetBulkChangelogs = z.input<typeof GetBulkChangelogsSchema>;
