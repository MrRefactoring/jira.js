import { z } from 'zod';
import { apiObject } from '#/core';

export const UserPickerResultsSchema = apiObject({
  users: z
    .array(
      apiObject({
        name: z.string().optional(),
        key: z.string().optional(),
        html: z.string().optional(),
        displayName: z.string().optional(),
        avatarUrl: z.string().optional(),
      }),
    )
    .optional(),
  total: z.number().optional(),
  header: z.string().optional(),
});

export type UserPickerResults = z.infer<typeof UserPickerResultsSchema>;
