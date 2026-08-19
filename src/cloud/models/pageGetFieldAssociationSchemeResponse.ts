import { pageSchema, type Page } from './page';
import {
  GetFieldAssociationSchemeResponseSchema,
  type GetFieldAssociationSchemeResponse,
} from './getFieldAssociationSchemeResponse';

export const PageGetFieldAssociationSchemeResponseSchema = pageSchema(GetFieldAssociationSchemeResponseSchema);

/**
 * @deprecated Use `Page<GetFieldAssociationSchemeResponse>`, which describes the same shape. This alias is removed in
 *   the next major version.
 */
export type PageGetFieldAssociationSchemeResponse = Page<GetFieldAssociationSchemeResponse>;
