import { z } from 'zod';
import { JQLPersonalDataMigrationRequestSchema } from '../models';

export const MigrateQueriesSchema = z.object({}).extend(JQLPersonalDataMigrationRequestSchema.shape);

export type MigrateQueries = z.input<typeof MigrateQueriesSchema>;
