import { z } from 'zod';
import { apiObject } from '#/core';
/** Card layout configuration. */

export const CardLayoutSchema = apiObject({
  /** Whether to show days in column */
  showDaysInColumn: z.enum(['true', 'false']).optional(),
});

export type CardLayout = z.infer<typeof CardLayoutSchema>;
