import type { CreateFieldAssociationSchemeLinks } from './createFieldAssociationSchemeLinks';

/** Response object after successfully creating a new field association scheme. */
export interface CreateFieldAssociationSchemeResponse {
  description?: string;
  id?: number;
  links?: CreateFieldAssociationSchemeLinks;
  name?: string;
}
