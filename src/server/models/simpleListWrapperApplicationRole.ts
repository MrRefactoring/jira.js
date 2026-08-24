import { z } from 'zod';
import { apiObject } from '#/core';
import { ListWrapperCallbackApplicationRoleSchema } from './listWrapperCallbackApplicationRole';

export const SimpleListWrapperApplicationRoleSchema = apiObject({
  callback: ListWrapperCallbackApplicationRoleSchema.optional(),
  maxResults: z.number().optional(),
  pagingCallback: ListWrapperCallbackApplicationRoleSchema.optional(),
  size: z.number().optional(),
});

export type SimpleListWrapperApplicationRole = z.infer<typeof SimpleListWrapperApplicationRoleSchema>;
