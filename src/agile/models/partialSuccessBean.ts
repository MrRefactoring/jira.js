export interface PartialSuccessBean {
  entries?: {
    issueId?: number;
    issueKey?: string;
    status?: number;
    errors?: string[];
  }[];
}
