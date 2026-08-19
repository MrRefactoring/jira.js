import { pageSchema, type Page } from './page';
import {
  GetProjectsWithFieldSchemesResponseSchema,
  type GetProjectsWithFieldSchemesResponse,
} from './getProjectsWithFieldSchemesResponse';

export const PageGetProjectsWithFieldSchemesResponseSchema = pageSchema(GetProjectsWithFieldSchemesResponseSchema);

/**
 * @deprecated Use `Page<GetProjectsWithFieldSchemesResponse>`, which describes the same shape. This alias is removed in
 *   the next major version.
 */
export type PageGetProjectsWithFieldSchemesResponse = Page<GetProjectsWithFieldSchemesResponse>;
