import { z } from 'zod';

/** Card layout configuration. */
export const CardLayoutSchema = z.object({
  /** Whether to show days in column */
  showDaysInColumn: z.boolean().optional(),
});

export type CardLayout = z.infer<typeof CardLayoutSchema>;
