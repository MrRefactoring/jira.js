import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusProjectUsagePageSchema } from './statusProjectUsagePage';
/** The projects using this status. */

export const StatusProjectUsageDTOSchema = apiObject({
  projects: StatusProjectUsagePageSchema.optional(),
  /** The status ID. */
  statusId: z.string().optional(),
});

export type StatusProjectUsageDTO = z.infer<typeof StatusProjectUsageDTOSchema>;
