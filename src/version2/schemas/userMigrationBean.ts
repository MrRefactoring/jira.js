import { z } from 'zod';

export const UserMigrationBeanSchema = z.object({
  accountId: z.string().optional(),
  key: z.string().optional(),
  username: z.string().optional(),
});

export type UserMigrationBean = z.infer<typeof UserMigrationBeanSchema>;
