import { z } from 'zod';
import { apiObject } from '#/core';

export const AvailableProjectsRequestSchema = apiObject({
  ignoredProjectIds: z.array(z.string()).optional(),
});

export type AvailableProjectsRequest = z.infer<typeof AvailableProjectsRequestSchema>;
