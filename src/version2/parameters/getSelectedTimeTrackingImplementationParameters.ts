import { z } from 'zod';

export const GetSelectedTimeTrackingImplementationParametersSchema = z.object({});

export type GetSelectedTimeTrackingImplementationParameters = z.infer<
  typeof GetSelectedTimeTrackingImplementationParametersSchema
>;
