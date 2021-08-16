/** @deprecated Use PartialSuccess instead. */
export type PartialSuccessBean = PartialSuccess;

export interface PartialSuccess {
  entries?: {
    issueId?: number;
    issueKey?: string;
    status?: number;
    errors?: string[];
  }[];
}
