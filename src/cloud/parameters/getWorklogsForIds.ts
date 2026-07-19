import { z } from 'zod';
import { WorklogIdsRequestSchema } from '../models';

export const GetWorklogsForIdsSchema = z
  .object({
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information about worklogs in the response. This parameter accepts `properties` that returns the properties of
     * each worklog.
     */
    expand: z
      .union([z.string(), z.array(z.string()), z.enum(['properties']), z.array(z.enum(['properties']))])
      .optional(),
  })
  .extend(WorklogIdsRequestSchema.shape);

export type GetWorklogsForIds = z.input<typeof GetWorklogsForIdsSchema>;
