import type { FieldAssociationSchemeLinks } from './fieldAssociationSchemeLinks';

/** Response object for getting a field association scheme by ID. */
export interface GetFieldAssociationSchemeByIdResponse {
  description?: string;
  id?: string;
  isDefault?: boolean;
  links?: FieldAssociationSchemeLinks;
  name?: string;
}
