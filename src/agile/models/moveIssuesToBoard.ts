import { z } from 'zod';
import { apiObject } from '#/core';

export const MoveIssuesToBoardSchema = apiObject({
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

export type MoveIssuesToBoard = z.infer<typeof MoveIssuesToBoardSchema>;
