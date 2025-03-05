import type { JqlFunctionPrecomputationUpdateRequest } from '../models';

export interface UpdatePrecomputations extends JqlFunctionPrecomputationUpdateRequest {
  skipNotFoundPrecomputations?: boolean;
}
