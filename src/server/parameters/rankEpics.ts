import { z } from 'zod';
import { EpicRankRequestSchema } from '../models';

export const RankEpicsSchema = z.object(EpicRankRequestSchema.shape).extend({
  /** The id or key of the epic to rank. */
  epicIdOrKey: z.string(),
});

export type RankEpics = z.input<typeof RankEpicsSchema>;
