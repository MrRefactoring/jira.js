import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';
import { DurationSchema } from './duration';

export const SlaInformationOngoingCycleSchema = apiObject({
  startTime: DateSchema.optional(),
  breachTime: DateSchema.optional(),
  breached: z.boolean().optional(),
  paused: z.boolean().optional(),
  withinCalendarHours: z.boolean().optional(),
  goalDuration: DurationSchema.optional(),
  elapsedTime: DurationSchema.optional(),
  remainingTime: DurationSchema.optional(),
});

export type SlaInformationOngoingCycle = z.infer<typeof SlaInformationOngoingCycleSchema>;
