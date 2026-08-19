import { pageSchema, type Page } from './page';
import {
  FieldAssociationSchemeFieldSearchResultSchema,
  type FieldAssociationSchemeFieldSearchResult,
} from './fieldAssociationSchemeFieldSearchResult';

export const Page2FieldAssociationSchemeFieldSearchResultSchema = pageSchema(
  FieldAssociationSchemeFieldSearchResultSchema,
);

/**
 * @deprecated Use `Page<FieldAssociationSchemeFieldSearchResult>`, which describes the same shape. This alias is
 *   removed in the next major version.
 */
export type Page2FieldAssociationSchemeFieldSearchResult = Page<FieldAssociationSchemeFieldSearchResult>;
