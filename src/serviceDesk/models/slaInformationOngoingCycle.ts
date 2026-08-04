import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';
import { DurationSchema } from './duration';

export const SlaInformationOngoingCycleSchema = apiObject({
  breachTime: DateSchema.optional(),
  /** Indicates whether the SLA has been breached (true) or not (false). */
  breached: z.boolean().optional(),
  elapsedTime: DurationSchema.optional(),
  goalDuration: DurationSchema.optional(),
  /** Indicates whether the SLA is paused (true) or not (false). */
  paused: z.boolean().optional(),
  remainingTime: DurationSchema.optional(),
  startTime: DateSchema.optional(),
  /** Indicates whether the SLA it timed during calendared working hours only (true) or not (false). */
  withinCalendarHours: z.boolean().optional(),
});

export type SlaInformationOngoingCycle = z.infer<typeof SlaInformationOngoingCycleSchema>;
