import { z } from 'zod';

export const GetLicenseParametersSchema = z.object({});

export type GetLicenseParameters = z.infer<typeof GetLicenseParametersSchema>;
