import { z } from 'zod';
import { openEnum } from '#/core';
import { CommentInputSchema } from '../models';

export const AddCommentSchema = z.object(CommentInputSchema.shape).extend({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
   * rendered in HTML.
   */
  expand: z
    .union([z.string(), z.array(z.string()), openEnum(['renderedBody']), z.array(openEnum(['renderedBody']))])
    .optional(),
});

export type AddComment = z.input<typeof AddCommentSchema>;
