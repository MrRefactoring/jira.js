import { z } from 'zod';

export const LegacyJackson1ListUserMigrationSchema = z.object({});

export type LegacyJackson1ListUserMigration = z.infer<typeof LegacyJackson1ListUserMigrationSchema>;
