import type { SingleRedactionRequest } from './singleRedactionRequest';

export interface BulkRedactionRequest {
  redactions?: SingleRedactionRequest[];
}
