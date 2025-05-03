import type { AssociationContextObject } from './associationContextObject';
import type { FieldIdentifierObject } from './fieldIdentifierObject';

/** Details of field associations with projects. */
export interface FieldAssociationsRequest {
  /** Contexts to associate/unassociate the fields with. */
  associationContexts: AssociationContextObject[];
  /** Fields to associate/unassociate with projects. */
  fields: FieldIdentifierObject[];
}
