import { z } from 'zod';
import { apiObject } from '#/core';
import { ScopeSchema } from './scope';
import { ScreenableTabSchema } from './screenableTab';
/** A screen with tab details. */

export const ScreenWithTabSchema = apiObject({
  /** The description of the screen. */
  description: z.string().optional(),
  /** The ID of the screen. */
  id: z.number().optional(),
  /** The name of the screen. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
  tab: ScreenableTabSchema.optional(),
});

export type ScreenWithTab = z.infer<typeof ScreenWithTabSchema>;
