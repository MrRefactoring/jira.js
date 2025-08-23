import { z } from 'zod';

export const GetConfigurationParametersSchema = z.object({});

export type GetConfigurationParameters = z.infer<typeof GetConfigurationParametersSchema>;
