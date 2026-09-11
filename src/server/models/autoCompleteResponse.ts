import { z } from 'zod';
import { apiObject } from '#/core';

export const AutoCompleteResponseSchema = apiObject({
  jqlReservedWords: z.array(z.string()).optional(),
  visibleFieldNames: z
    .array(
      apiObject({
        value: z.string(),
        displayName: z.string(),
        operators: z.array(z.string()),
        types: z.array(z.string()),
        searchable: z.string().optional(),
        orderable: z.string().optional(),
        auto: z.string().optional(),
        cfid: z.string().optional(),
      }),
    )
    .optional(),
  visibleFunctionNames: z
    .array(
      apiObject({
        value: z.string(),
        displayName: z.string(),
        types: z.array(z.string()),
        isList: z.string().optional(),
      }),
    )
    .optional(),
});

export type AutoCompleteResponse = z.infer<typeof AutoCompleteResponseSchema>;
