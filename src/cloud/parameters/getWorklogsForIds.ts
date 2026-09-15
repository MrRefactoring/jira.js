import { z } from 'zod';
import { openEnum } from '#/core';
import { WorklogIdsRequestSchema } from '../models';

export const GetWorklogsForIdsSchema = z.object(WorklogIdsRequestSchema.shape).extend({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each
   * worklog.
   */
  expand: z.union([openEnum(['properties']), z.array(openEnum(['properties']))]).optional(),
});

export type GetWorklogsForIds = z.input<typeof GetWorklogsForIdsSchema>;
