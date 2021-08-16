/** @deprecated Use EstimationConfig instead. */
export type EstimationConfigBean = EstimationConfig;

export interface EstimationConfig {
  type?: string;
  field?: {
    fieldId?: string;
    displayName?: string;
  };
}
