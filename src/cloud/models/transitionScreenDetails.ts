import { z } from 'zod';
import { apiObject } from '#/core';
/** The details of a transition screen. */

export const TransitionScreenDetailsSchema = apiObject({
  /** The ID of the screen. */
  id: z.string(),
  /** The name of the screen. */
  name: z.string().optional(),
});

export type TransitionScreenDetails = z.infer<typeof TransitionScreenDetailsSchema>;
