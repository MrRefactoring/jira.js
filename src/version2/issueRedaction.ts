import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueRedaction {
  constructor(private client: Client) {}

  /**
   * Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields
   * asynchronously.
   *
   * The redaction status can be polled using the job id.
   */
  async redact<T = string>(parameters: Parameters.Redact, callback: Callback<T>): Promise<void>;
  /**
   * Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields
   * asynchronously.
   *
   * The redaction status can be polled using the job id.
   */
  async redact<T = string>(parameters: Parameters.Redact, callback?: never): Promise<T>;
  async redact<T = string>(parameters: Parameters.Redact, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/redact',
      method: 'POST',
      data: {
        redactions: parameters.redactions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieves the current status of a redaction job ID.
   *
   * The jobStatus will be one of the following:
   *
   * - IN_PROGRESS - The redaction job is currently in progress
   * - COMPLETED - The redaction job has completed successfully.
   * - PENDING - The redaction job has not started yet
   */
  async getRedactionStatus<T = Models.RedactionJobStatusResponse>(
    parameters: Parameters.GetRedactionStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieves the current status of a redaction job ID.
   *
   * The jobStatus will be one of the following:
   *
   * - IN_PROGRESS - The redaction job is currently in progress
   * - COMPLETED - The redaction job has completed successfully.
   * - PENDING - The redaction job has not started yet
   */
  async getRedactionStatus<T = Models.RedactionJobStatusResponse>(
    parameters: Parameters.GetRedactionStatus,
    callback?: never,
  ): Promise<T>;
  async getRedactionStatus<T = Models.RedactionJobStatusResponse>(
    parameters: Parameters.GetRedactionStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/redact/status/${parameters.jobId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
