import type { z } from 'zod';
import { apiObject } from '#/core';
import { ManageabilityRuleObjectMutabilitySchema } from './manageabilityRuleObjectMutability';
import { ManageabilityRuleSimpleSchema } from './manageabilityRuleSimple';

export const GetManagementPermissionsSchema = apiObject({
  profile: ManageabilityRuleObjectMutabilitySchema.optional(),
  'profile.write': ManageabilityRuleObjectMutabilitySchema.optional(),
  'profile.read': ManageabilityRuleSimpleSchema.optional(),
  'email.set': ManageabilityRuleSimpleSchema.optional(),
  'lifecycle.enablement': ManageabilityRuleSimpleSchema.optional(),
  'lifecycle.delete': ManageabilityRuleSimpleSchema.optional(),
  'apiToken.read': ManageabilityRuleSimpleSchema.optional(),
  'apiToken.delete': ManageabilityRuleSimpleSchema.optional(),
});

export type GetManagementPermissions = z.infer<typeof GetManagementPermissionsSchema>;
