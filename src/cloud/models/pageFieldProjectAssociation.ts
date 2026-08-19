import { pageSchema, type Page } from './page';
import { FieldProjectAssociationSchema, type FieldProjectAssociation } from './fieldProjectAssociation';

export const PageFieldProjectAssociationSchema = pageSchema(FieldProjectAssociationSchema);

/**
 * @deprecated Use `Page<FieldProjectAssociation>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageFieldProjectAssociation = Page<FieldProjectAssociation>;
