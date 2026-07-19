import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of the time tracking configuration. */

export const TimeTrackingConfigurationSchema = apiObject({
  /** The default unit of time applied to logged time. */
  defaultUnit: z.enum(['minute', 'hour', 'day', 'week']),
  /** The format that will appear on an issue's _Time Spent_ field. */
  timeFormat: z.enum(['pretty', 'days', 'hours']),
  /** The number of days in a working week. */
  workingDaysPerWeek: z.number(),
  /** The number of hours in a working day. */
  workingHoursPerDay: z.number(),
});

export type TimeTrackingConfiguration = z.infer<typeof TimeTrackingConfigurationSchema>;
