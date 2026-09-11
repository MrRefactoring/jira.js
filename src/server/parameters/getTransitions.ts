import { z } from 'zod';

export const GetTransitionsSchema = z.object({
  /** Transition id */
  transitionId: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetTransitions = z.input<typeof GetTransitionsSchema>;
