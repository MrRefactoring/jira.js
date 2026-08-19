import { z } from 'zod';
import { TimeTrackingProviderSchema } from '../models';

export const SelectTimeTrackingImplementationSchema = z.object(TimeTrackingProviderSchema.shape);

export type SelectTimeTrackingImplementation = z.input<typeof SelectTimeTrackingImplementationSchema>;
