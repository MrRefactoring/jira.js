import type { SearchResultFieldParameters } from './searchResultFieldParameters';
import type { SearchResultWorkTypeParameters } from './searchResultWorkTypeParameters';

/** Field association scheme field search results. */
export interface FieldAssociationSchemeFieldSearchResult {
  allowedOperations?: string[];
  fieldId?: string;
  parameters?: SearchResultFieldParameters;
  restrictedToWorkTypes?: string[];
  workTypeParameters?: SearchResultWorkTypeParameters[];
}
