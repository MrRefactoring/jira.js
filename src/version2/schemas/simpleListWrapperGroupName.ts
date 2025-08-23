import { z } from 'zod';
import { ListWrapperCallbackGroupNameSchema } from './listWrapperCallbackGroupName';
import { GroupNameSchema } from './groupName';

export const SimpleListWrapperGroupNameSchema = z
  .object({
    callback: ListWrapperCallbackGroupNameSchema.optional(),
    items: z.array(GroupNameSchema).optional(),
    'max-results': z.number().int().optional(),
    pagingCallback: ListWrapperCallbackGroupNameSchema.optional(),
    size: z.number().int().optional(),
  })
  .transform(val => ({
    callback: val['callback'],
    items: val['items'],
    maxResults: val['max-results'],
    pagingCallback: val['pagingCallback'],
    size: val['size'],
  }));

export type SimpleListWrapperGroupName = z.infer<typeof SimpleListWrapperGroupNameSchema>;
