import type { z } from 'zod';
import { openEnum } from '#/core';
/** The type of account */

export const AccountTypeSchema = openEnum(['atlassian', 'customer', 'app']);

export type AccountType = z.infer<typeof AccountTypeSchema>;
