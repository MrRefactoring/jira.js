import { z } from 'zod';
import { BulkPermissionsRequestSchema } from '../models';

export const GetBulkPermissionsSchema = z.object({}).extend(BulkPermissionsRequestSchema.shape);

export type GetBulkPermissions = z.input<typeof GetBulkPermissionsSchema>;
