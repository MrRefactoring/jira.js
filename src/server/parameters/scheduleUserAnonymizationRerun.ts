import { z } from 'zod';
import { UserAnonymizationRerunRequestSchema } from '../models';

export const ScheduleUserAnonymizationRerunSchema = z.object(UserAnonymizationRerunRequestSchema.shape);

export type ScheduleUserAnonymizationRerun = z.input<typeof ScheduleUserAnonymizationRerunSchema>;
