import { z } from 'zod';
import { AppMonitoringRestEntitySchema } from '../models';

export const SetAppMonitoringEnabledSchema = z.object(AppMonitoringRestEntitySchema.shape);

export type SetAppMonitoringEnabled = z.input<typeof SetAppMonitoringEnabledSchema>;
