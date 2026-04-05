import { z } from 'zod';
import { ScopeSchema } from '#/models/scope';
import { ScreenableTabSchema } from '#/models/screenableTab';

/** A screen with tab details. */
export const ScreenWithTabSchema = z.object({
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
