import { z } from 'zod';
import { apiObject } from '#/core';

export const LicenseValidationResultsSchema = apiObject({
  errors: z.record(z.string(), z.any()).optional(),
  licenseString: z.string().optional(),
});

export type LicenseValidationResults = z.infer<typeof LicenseValidationResultsSchema>;
