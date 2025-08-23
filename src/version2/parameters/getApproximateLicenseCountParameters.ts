import { z } from 'zod';

export const GetApproximateLicenseCountParametersSchema = z.object({});

export type GetApproximateLicenseCountParameters = z.infer<typeof GetApproximateLicenseCountParametersSchema>;
