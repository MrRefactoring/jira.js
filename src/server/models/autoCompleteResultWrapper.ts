import { z } from 'zod';
import { apiObject } from '#/core';

export const AutoCompleteResultWrapperSchema = apiObject({
  results: z
    .array(
      apiObject({
        value: z.string(),
        displayName: z.string(),
      }),
    )
    .optional(),
});

export type AutoCompleteResultWrapper = z.infer<typeof AutoCompleteResultWrapperSchema>;
