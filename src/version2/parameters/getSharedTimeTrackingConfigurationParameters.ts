import { z } from 'zod';

export const GetSharedTimeTrackingConfigurationParametersSchema = z.object({});

export type GetSharedTimeTrackingConfigurationParameters = z.infer<
  typeof GetSharedTimeTrackingConfigurationParametersSchema
>;
