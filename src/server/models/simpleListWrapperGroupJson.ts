import { z } from 'zod';
import { apiObject } from '#/core';
import { ListWrapperCallbackGroupJsonSchema } from './listWrapperCallbackGroupJson';

export const SimpleListWrapperGroupJsonSchema = apiObject({
  callback: ListWrapperCallbackGroupJsonSchema.optional(),
  maxResults: z.number().optional(),
  pagingCallback: ListWrapperCallbackGroupJsonSchema.optional(),
  size: z.number().optional(),
});

export type SimpleListWrapperGroupJson = z.infer<typeof SimpleListWrapperGroupJsonSchema>;
