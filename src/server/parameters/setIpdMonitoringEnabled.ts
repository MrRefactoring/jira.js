import { z } from 'zod';
import { IpdMonitoringRestEntitySchema } from '../models';

export const SetIpdMonitoringEnabledSchema = z.object(IpdMonitoringRestEntitySchema.shape);

export type SetIpdMonitoringEnabled = z.input<typeof SetIpdMonitoringEnabledSchema>;
