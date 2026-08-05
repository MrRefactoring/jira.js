import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Card layout configuration. */

export const CardLayoutSchema = apiObject({
  /** Whether to show days in column */
  showDaysInColumn: openEnum(['true', 'false']).optional(),
});

export type CardLayout = z.infer<typeof CardLayoutSchema>;
