import { z } from 'zod';
import { apiObject } from '#/core';
import { ListWrapperCallbackApplicationRoleSchema } from './listWrapperCallbackApplicationRole';
import { ApplicationRoleSchema } from './applicationRole';

export const SimpleListWrapperApplicationRoleSchema = apiObject({
  callback: ListWrapperCallbackApplicationRoleSchema.optional(),
  items: z.array(ApplicationRoleSchema).optional(),
  'max-results': z.number().optional(),
  pagingCallback: ListWrapperCallbackApplicationRoleSchema.optional(),
  size: z.number().optional(),
});

export type SimpleListWrapperApplicationRole = z.infer<typeof SimpleListWrapperApplicationRoleSchema>;
