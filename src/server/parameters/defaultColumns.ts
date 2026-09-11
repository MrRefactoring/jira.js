import { z } from 'zod';

export const DefaultColumnsSchema = z.object({
  /** Username */
  username: z.string().optional(),
});

export type DefaultColumns = z.input<typeof DefaultColumnsSchema>;
