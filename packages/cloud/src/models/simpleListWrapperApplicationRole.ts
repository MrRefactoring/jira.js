import { z } from 'zod';
import { ListWrapperCallbackApplicationRoleSchema } from '#/models/listWrapperCallbackApplicationRole';
import { ApplicationRoleSchema } from '#/models/applicationRole';

export const SimpleListWrapperApplicationRoleSchema = z.object({
  callback: ListWrapperCallbackApplicationRoleSchema.optional(),
  items: z.array(ApplicationRoleSchema).optional(),
  'max-results': z.number().optional(),
  pagingCallback: ListWrapperCallbackApplicationRoleSchema.optional(),
  size: z.number().optional(),
});

export type SimpleListWrapperApplicationRole = z.infer<typeof SimpleListWrapperApplicationRoleSchema>;
