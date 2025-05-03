import type { SuggestedMappingsForPrioritiesRequest } from './suggestedMappingsForPrioritiesRequest';
import type { SuggestedMappingsForProjectsRequest } from './suggestedMappingsForProjectsRequest';

/** Details of changes to a priority scheme that require suggested priority mappings. */
export interface SuggestedMappingsRequest {
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  priorities?: SuggestedMappingsForPrioritiesRequest;
  projects?: SuggestedMappingsForProjectsRequest;
  /** The id of the priority scheme. */
  schemeId?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
}
