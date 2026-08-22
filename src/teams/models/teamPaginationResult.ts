import { z } from 'zod';
import { apiObject } from '#/core';
import { TeamSchema } from './team';
/** Cursor pagination result for PublicApiTeam */

export const TeamPaginationResultSchema = apiObject({
  /** The cursor for pagination */
  cursor: z.string().nullish(),
  /** The list of teams */
  entities: z.array(TeamSchema),
});

export type TeamPaginationResult = z.infer<typeof TeamPaginationResultSchema>;
