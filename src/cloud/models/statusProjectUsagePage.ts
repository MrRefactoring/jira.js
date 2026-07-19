import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusProjectUsageSchema } from './statusProjectUsage';
/** A page of projects. */

export const StatusProjectUsagePageSchema = apiObject({
  /** Page token for the next page of issue type usages. */
  nextPageToken: z.string().optional(),
  /** The list of projects. */
  values: z.array(StatusProjectUsageSchema).optional(),
});

export type StatusProjectUsagePage = z.infer<typeof StatusProjectUsagePageSchema>;
