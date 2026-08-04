import { z } from 'zod';
import { apiObject } from '#/core';
import { ListWrapperCallbackGroupNameSchema } from './listWrapperCallbackGroupName';
import { GroupNameSchema } from './groupName';

export const SimpleListWrapperGroupNameSchema = apiObject({
  callback: ListWrapperCallbackGroupNameSchema.optional(),
  items: z.array(GroupNameSchema).optional(),
  'max-results': z.number().optional(),
  pagingCallback: ListWrapperCallbackGroupNameSchema.optional(),
  size: z.number().optional(),
});

export type SimpleListWrapperGroupName = z.infer<typeof SimpleListWrapperGroupNameSchema>;
