import { z } from 'zod';
import { IssueCommentListRequestSchema } from '../models';

export const GetCommentsByIdsSchema = z
  .object({
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information about comments in the response. This parameter accepts a comma-separated list. Expand options
     * include:
     *
     * - `renderedBody` Returns the comment body rendered in HTML.
     * - `properties` Returns the comment's properties.
     */
    expand: z
      .union([
        z.string(),
        z.array(z.string()),
        z.enum(['renderedBody', 'properties']),
        z.array(z.enum(['renderedBody', 'properties'])),
      ])
      .optional(),
  })
  .extend(IssueCommentListRequestSchema.shape);

export type GetCommentsByIds = z.input<typeof GetCommentsByIdsSchema>;
