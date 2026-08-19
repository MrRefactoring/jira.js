import { z } from 'zod';
import { openEnum } from '#/core';
import { IssueCommentListRequestSchema } from '../models';

export const GetCommentsByIdsSchema = z.object(IssueCommentListRequestSchema.shape).extend({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about comments in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `renderedBody` Returns the comment body rendered in HTML.
   * - `properties` Returns the comment's properties.
   */
  expand: z
    .union([
      z.string(),
      z.array(z.string()),
      openEnum(['renderedBody', 'properties']),
      z.array(openEnum(['renderedBody', 'properties'])),
    ])
    .optional(),
});

export type GetCommentsByIds = z.input<typeof GetCommentsByIdsSchema>;
