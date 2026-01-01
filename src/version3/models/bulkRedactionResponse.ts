import type { SingleRedactionResponse } from './singleRedactionResponse';

export interface BulkRedactionResponse {
  /** Result for requested redactions */
  results: SingleRedactionResponse[];
}
