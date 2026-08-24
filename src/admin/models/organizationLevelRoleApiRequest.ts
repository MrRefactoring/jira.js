import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const OrganizationLevelRoleApiRequestSchema = apiObject({
  role: openEnum(['atlassian/org-admin']),
});

export type OrganizationLevelRoleApiRequest = z.infer<typeof OrganizationLevelRoleApiRequestSchema>;
