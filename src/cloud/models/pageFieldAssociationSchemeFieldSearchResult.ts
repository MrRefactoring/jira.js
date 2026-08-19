import { pageSchema, type Page } from './page';
import {
  FieldAssociationSchemeFieldSearchResultSchema,
  type FieldAssociationSchemeFieldSearchResult,
} from './fieldAssociationSchemeFieldSearchResult';

export const PageFieldAssociationSchemeFieldSearchResultSchema = pageSchema(
  FieldAssociationSchemeFieldSearchResultSchema,
);

/**
 * @deprecated Use `Page<FieldAssociationSchemeFieldSearchResult>`, which describes the same shape. This alias is
 *   removed in the next major version.
 */
export type PageFieldAssociationSchemeFieldSearchResult = Page<FieldAssociationSchemeFieldSearchResult>;
