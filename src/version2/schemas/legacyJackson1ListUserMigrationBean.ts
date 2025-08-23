import { z } from 'zod';
import { UserMigrationBeanSchema } from './userMigrationBean';

export const LegacyJackson1ListUserMigrationBeanSchema = z.array(UserMigrationBeanSchema);

export type LegacyJackson1ListUserMigrationBean = z.infer<typeof LegacyJackson1ListUserMigrationBeanSchema>;
