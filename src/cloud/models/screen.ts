import { z } from 'zod';
import { apiObject } from '#/core';
import { ScopeSchema } from './scope';
/** A screen. */

export const ScreenSchema = apiObject({
  /** The description of the screen. */
  description: z.string().optional(),
  /** The ID of the screen. */
  id: z.number().optional(),
  /** The name of the screen. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
});

export type Screen = z.infer<typeof ScreenSchema>;
