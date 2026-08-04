import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';
import { DurationSchema } from './duration';

export const SlaInformationCompletedCycleSchema = apiObject({
  breachTime: DateSchema.optional(),
  /** Indicates if the SLA (duration) was exceeded (true) or not (false). */
  breached: z.boolean().optional(),
  elapsedTime: DurationSchema.optional(),
  goalDuration: DurationSchema.optional(),
  remainingTime: DurationSchema.optional(),
  startTime: DateSchema.optional(),
  stopTime: DateSchema.optional(),
});

export type SlaInformationCompletedCycle = z.infer<typeof SlaInformationCompletedCycleSchema>;
