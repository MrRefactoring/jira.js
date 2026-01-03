import type { BulkRedactionResponse } from './bulkRedactionResponse';

export interface RedactionJobStatusResponse {
  bulkRedactionResponse?: BulkRedactionResponse;
  jobStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | string;
}
