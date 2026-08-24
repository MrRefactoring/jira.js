import { z } from 'zod';
import { WorklogIdsRequestSchema } from '../models';

export const GetWorklogsForIdsSchema = z.object(WorklogIdsRequestSchema.shape);

export type GetWorklogsForIds = z.input<typeof GetWorklogsForIdsSchema>;
