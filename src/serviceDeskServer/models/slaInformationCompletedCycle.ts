import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';
import { DurationSchema } from './duration';

export const SlaInformationCompletedCycleSchema = apiObject({
  startTime: DateSchema.optional(),
  stopTime: DateSchema.optional(),
  breached: z.boolean().optional(),
  goalDuration: DurationSchema.optional(),
  elapsedTime: DurationSchema.optional(),
  remainingTime: DurationSchema.optional(),
});

export type SlaInformationCompletedCycle = z.infer<typeof SlaInformationCompletedCycleSchema>;
