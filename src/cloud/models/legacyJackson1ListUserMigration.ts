import { z } from 'zod';
import { UserMigrationSchema } from './userMigration';

export const LegacyJackson1ListUserMigrationSchema = z.array(UserMigrationSchema);

export type LegacyJackson1ListUserMigration = z.infer<typeof LegacyJackson1ListUserMigrationSchema>;
