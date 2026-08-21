import { z } from 'zod';
import { UserAnonymizationRequestSchema } from '../models';

export const ScheduleUserAnonymizationSchema = z.object(UserAnonymizationRequestSchema.shape);

export type ScheduleUserAnonymization = z.input<typeof ScheduleUserAnonymizationSchema>;
