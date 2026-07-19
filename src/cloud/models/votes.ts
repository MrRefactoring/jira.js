import { z } from 'zod';
import { apiObject } from '#/core';
import { DashboardUserSchema } from './dashboardUser';
/** The details of votes on an issue. */

export const VotesSchema = apiObject({
  /** Whether the user making this request has voted on the issue. */
  hasVoted: z.boolean().optional(),
  /** The URL of these issue vote details. */
  self: z.string().url().optional(),
  /**
   * List of the users who have voted on this issue. An empty list is returned when the calling user doesn't have the
   * _View voters and watchers_ project permission.
   */
  voters: z.array(DashboardUserSchema).optional(),
  /** The number of votes on the issue. */
  votes: z.number().optional(),
});

export type Votes = z.infer<typeof VotesSchema>;
