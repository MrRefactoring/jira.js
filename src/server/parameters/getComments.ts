import { z } from 'zod';
import { openEnum } from '#/core';

export const GetCommentsSchema = z.object({
  /** Optional flags: renderedBody (provides body rendered in HTML) This parameter accepts a comma-separated list. */
  expand: z.union([openEnum(['renderedBody']), z.array(openEnum(['renderedBody']))]).optional(),
  /** How many results on the page should be included. Defaults to 50. */
  maxResults: z.number().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Ordering of the results */
  orderBy: z.string().optional(),
  /** The page offset, if not specified then defaults to 0 */
  startAt: z.number().optional(),
});

export type GetComments = z.input<typeof GetCommentsSchema>;
