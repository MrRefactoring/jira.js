import { z } from 'zod';

export const MoveIssuesToBacklogSchema = z.object({
  issues: z.array(z.string()),
});

export type MoveIssuesToBacklog = z.input<typeof MoveIssuesToBacklogSchema>;
