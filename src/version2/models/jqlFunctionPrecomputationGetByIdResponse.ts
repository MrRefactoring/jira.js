import type { JqlFunctionPrecomputation } from './jqlFunctionPrecomputation';

/** Get precomputations by ID response. */
export interface JqlFunctionPrecomputationGetByIdResponse {
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: string[];
  /** The list of precomputations. */
  precomputations?: JqlFunctionPrecomputation[];
}
