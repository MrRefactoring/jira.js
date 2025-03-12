import type { GetTeamResponseForPage } from './getTeamResponseForPage';

export interface PageWithCursorGetTeamResponseForPage {
  cursor?: string;
  last?: boolean;
  nextPageCursor?: string;
  size?: number;
  total?: number;
  values?: GetTeamResponseForPage[];
}
