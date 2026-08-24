import { z } from 'zod';
import { apiObject } from '#/core';

export const GetImportScheduleLinksSchema = apiObject({
  links: apiObject({
    /** URL to POST to create a new schedule */
    createSchedule: z.string(),
    /** URL to GET/PUT/DELETE an existing schedule. Only present if a schedule exists for this import source. */
    schedule: z.string().optional(),
  }).optional(),
  result: z.string().optional(),
});

export type GetImportScheduleLinks = z.infer<typeof GetImportScheduleLinksSchema>;
