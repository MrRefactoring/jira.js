import { z } from 'zod';

export const UserMigrationSchema = z.object({
  accountId: z.string().optional(),
  key: z.string().optional(),
  username: z.string().optional(),
});

export type UserMigration = z.infer<typeof UserMigrationSchema>;
