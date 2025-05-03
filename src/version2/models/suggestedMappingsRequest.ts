import type { SuggestedMappingsForPrioritiesRequestBean } from './suggestedMappingsForPrioritiesRequestBean';
import type { SuggestedMappingsForProjectsRequestBean } from './suggestedMappingsForProjectsRequestBean';

/** Details of changes to a priority scheme that require suggested priority mappings. */
export interface SuggestedMappingsRequest {
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  priorities?: SuggestedMappingsForPrioritiesRequestBean;
  projects?: SuggestedMappingsForProjectsRequestBean;
  /** The id of the priority scheme. */
  schemeId?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
}
