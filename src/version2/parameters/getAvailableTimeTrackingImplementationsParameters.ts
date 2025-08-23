import { z } from 'zod';

export const GetAvailableTimeTrackingImplementationsParametersSchema = z.object({});

export type GetAvailableTimeTrackingImplementationsParameters = z.infer<
  typeof GetAvailableTimeTrackingImplementationsParametersSchema
>;
