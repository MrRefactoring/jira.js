import { z } from 'zod';
import { apiObject } from '#/core';

export const UserMigrationSchema = apiObject({
  accountId: z.string().optional(),
  key: z.string().optional(),
  username: z.string().optional(),
});

export type UserMigration = z.infer<typeof UserMigrationSchema>;
