import { z } from 'zod';

export const RankEpicsSchema = z.object({
  /** The id or key of the epic to rank. */
  epicIdOrKey: z.string(),
  rankAfterEpic: z.string().optional(),
  rankBeforeEpic: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type RankEpics = z.input<typeof RankEpicsSchema>;
