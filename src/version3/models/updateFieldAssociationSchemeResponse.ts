import type { UpdateFieldAssociationSchemeLinks } from './updateFieldAssociationSchemeLinks';

/** Response object after successfully updating an existing field association scheme. */
export interface UpdateFieldAssociationSchemeResponse {
  description?: string;
  id?: number;
  links?: UpdateFieldAssociationSchemeLinks;
  name?: string;
}
