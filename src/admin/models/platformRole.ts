import type { z } from 'zod';
import { openEnum } from '#/core';

export const PlatformRoleSchema = openEnum([
  'atlassian/org-admin',
  'atlassian/site-admin',
  'atlassian/user-access-admin',
  'atlassian/ai-access',
]);

export type PlatformRole = z.infer<typeof PlatformRoleSchema>;
