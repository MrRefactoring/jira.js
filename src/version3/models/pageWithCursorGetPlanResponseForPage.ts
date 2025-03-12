import type { GetPlanResponseForPage } from './getPlanResponseForPage';

export interface PageWithCursorGetPlanResponseForPage {
  cursor?: string;
  last?: boolean;
  nextPageCursor?: string;
  size?: number;
  total?: number;
  values?: GetPlanResponseForPage[];
}
