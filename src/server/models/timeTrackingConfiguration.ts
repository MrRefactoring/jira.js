import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const TimeTrackingConfigurationSchema = apiObject({
  defaultUnit: openEnum(['minute', 'hour', 'day', 'week']).optional(),
  timeFormat: openEnum(['pretty', 'days', 'hours']).optional(),
  workingDaysPerWeek: z.number().optional(),
  workingHoursPerDay: z.number().optional(),
});

export type TimeTrackingConfiguration = z.infer<typeof TimeTrackingConfigurationSchema>;
