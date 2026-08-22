import { z } from 'zod';

export const ResetUserColumnsSchema = z.object({
  /** Username */
  username: z.string().optional(),
});

export type ResetUserColumns = z.input<typeof ResetUserColumnsSchema>;
