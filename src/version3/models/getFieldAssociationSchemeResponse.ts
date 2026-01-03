import type { FieldAssociationSchemeLinks } from './fieldAssociationSchemeLinks';
import type { FieldAssociationSchemeMatchedFilters } from './fieldAssociationSchemeMatchedFilters';

/** Response object for getting a field association scheme. */
export interface GetFieldAssociationSchemeResponse {
  description?: string;
  id?: number;
  isDefault?: boolean;
  links?: FieldAssociationSchemeLinks;
  matchedFilters?: FieldAssociationSchemeMatchedFilters;
  name?: string;
}
