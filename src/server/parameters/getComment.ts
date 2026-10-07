import { z } from 'zod';
import { openEnum } from '#/core';

export const GetCommentSchema = z.object({
  /** Optional flags: renderedBody (provides body rendered in HTML) This parameter accepts a comma-separated list. */
  expand: z.union([openEnum(['renderedBody']), z.array(openEnum(['renderedBody']))]).optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Comment id */
  id: z.string(),
});

export type GetComment = z.input<typeof GetCommentSchema>;
