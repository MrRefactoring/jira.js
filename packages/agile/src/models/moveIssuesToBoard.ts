import { z } from 'zod';

export const MoveIssuesToBoardSchema = z.object({
  entries: z
    .array(
      z.object({
        errors: z.array(z.string()).optional(),
        issueId: z.number().optional(),
        issueKey: z.string().optional(),
        status: z.number().optional(),
      }),
    )
    .optional(),
});

export type MoveIssuesToBoard = z.infer<typeof MoveIssuesToBoardSchema>;
