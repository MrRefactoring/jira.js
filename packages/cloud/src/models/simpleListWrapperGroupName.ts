import { z } from 'zod';
import { ListWrapperCallbackGroupNameSchema } from '#/models/listWrapperCallbackGroupName';
import { GroupNameSchema } from '#/models/groupName';

export const SimpleListWrapperGroupNameSchema = z.object({
  callback: ListWrapperCallbackGroupNameSchema.optional(),
  items: z.array(GroupNameSchema).optional(),
  'max-results': z.number().optional(),
  pagingCallback: ListWrapperCallbackGroupNameSchema.optional(),
  size: z.number().optional(),
});

export type SimpleListWrapperGroupName = z.infer<typeof SimpleListWrapperGroupNameSchema>;
