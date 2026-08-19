import { z } from 'zod';
import { JQLPersonalDataMigrationRequestSchema } from '../models';

export const MigrateQueriesSchema = z.object(JQLPersonalDataMigrationRequestSchema.shape);

export type MigrateQueries = z.input<typeof MigrateQueriesSchema>;
