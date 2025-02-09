import { JqlFunctionPrecomputationBean } from './jqlFunctionPrecomputationBean';

/** Get precomputations by ID response. */
export interface JqlFunctionPrecomputationGetByIdResponse {
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: string[];
  /** The list of precomputations. */
  precomputations?: JqlFunctionPrecomputationBean[];
}
