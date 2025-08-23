import type { Client } from '../client';
import type { Request } from '../request';
import type { RedactParameters } from './parameters/redactParameters';
import type { GetRedactionStatusParameters } from './parameters/getRedactionStatusParameters';

export class IssueRedaction {
  constructor(private client: Client) {}
  /**
   * Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields
   * asynchronously. *
   *
   * - The redaction status can be polled using the job id.
   */
  async redact(parameters: RedactParameters) {
    const request: Request = {
      url: '/rest/api/2/redact',
      method: 'POST',
      body: {
        redactions: parameters.redactions,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Retrieves the current status of a redaction job ID. *
   *
   * - The jobStatus will be one of the following:
   * -
   * - - IN_PROGRESS - The redaction job is currently in progress
   * - - COMPLETED - The redaction job has completed successfully.
   * - - PENDING - The redaction job has not started yet
   */
  async getRedactionStatus(parameters: GetRedactionStatusParameters) {
    const request: Request = {
      url: `/rest/api/2/redact/status/${parameters.jobId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
