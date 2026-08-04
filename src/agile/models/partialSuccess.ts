import { z } from 'zod';
import { apiObject } from '#/core';

export const PartialSuccessSchema = apiObject({
  entries: z
    .array(
      apiObject({
        errors: z.array(z.string()).optional(),
        issueId: z.number().optional(),
        issueKey: z.string().optional(),
        status: z.number().optional(),
      }),
    )
    .optional(),
});

export type PartialSuccess = z.infer<typeof PartialSuccessSchema>;
