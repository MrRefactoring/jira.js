import { LicenseValidationResultsSchema, type LicenseValidationResults } from '../models/licenseValidationResults';
import type { Validate } from '../parameters/validate';
import type { Client, SendRequestOptions } from '#/core';

/** Validates a Jira license */
export async function validate(client: Client, parameters: Validate): Promise<LicenseValidationResults> {
  const config: SendRequestOptions<LicenseValidationResults> = {
    url: '/rest/api/2/licenseValidator',
    method: 'POST',
    body: parameters.body,
    schema: LicenseValidationResultsSchema,
  };

  return await client.sendRequest(config);
}
