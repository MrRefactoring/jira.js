import type { GetIssueSourceResponse } from './getIssueSourceResponse';

export interface GetPlanResponseForPage {
  /** The plan ID. */
  id: string;
  /** The issue sources included in the plan. */
  issueSources?: GetIssueSourceResponse[];
  /** The plan name. */
  name: string;
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: 'Active' | 'Trashed' | 'Archived' | string;
}
