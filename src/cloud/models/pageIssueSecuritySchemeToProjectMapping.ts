import { pageSchema, type Page } from './page';
import {
  IssueSecuritySchemeToProjectMappingSchema,
  type IssueSecuritySchemeToProjectMapping,
} from './issueSecuritySchemeToProjectMapping';

export const PageIssueSecuritySchemeToProjectMappingSchema = pageSchema(IssueSecuritySchemeToProjectMappingSchema);

/**
 * @deprecated Use `Page<IssueSecuritySchemeToProjectMapping>`, which describes the same shape. This alias is removed in
 *   the next major version.
 */
export type PageIssueSecuritySchemeToProjectMapping = Page<IssueSecuritySchemeToProjectMapping>;
