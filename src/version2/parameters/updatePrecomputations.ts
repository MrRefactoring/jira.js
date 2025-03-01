import { JqlFunctionPrecomputationUpdateRequest } from '../models';

export interface UpdatePrecomputations extends JqlFunctionPrecomputationUpdateRequest {
  skipNotFoundPrecomputations?: boolean;
}
