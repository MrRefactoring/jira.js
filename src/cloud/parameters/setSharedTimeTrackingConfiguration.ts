import { z } from 'zod';
import { TimeTrackingConfigurationSchema } from '../models';

export const SetSharedTimeTrackingConfigurationSchema = z.object(TimeTrackingConfigurationSchema.shape);

export type SetSharedTimeTrackingConfiguration = z.input<typeof SetSharedTimeTrackingConfigurationSchema>;
