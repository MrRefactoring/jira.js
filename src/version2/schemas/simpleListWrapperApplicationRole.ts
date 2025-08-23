import { z } from 'zod';
import { ListWrapperCallbackApplicationRoleSchema } from './listWrapperCallbackApplicationRole';
import { ApplicationRoleSchema } from './applicationRole';

export const SimpleListWrapperApplicationRoleSchema = z
  .object({
    callback: ListWrapperCallbackApplicationRoleSchema.optional(),
    items: z.array(ApplicationRoleSchema).optional(),
    'max-results': z.number().int().optional(),
    pagingCallback: ListWrapperCallbackApplicationRoleSchema.optional(),
    size: z.number().int().optional(),
  })
  .transform(val => ({
    callback: val['callback'],
    items: val['items'],
    maxResults: val['max-results'],
    pagingCallback: val['pagingCallback'],
    size: val['size'],
  }));

export type SimpleListWrapperApplicationRole = z.infer<typeof SimpleListWrapperApplicationRoleSchema>;
