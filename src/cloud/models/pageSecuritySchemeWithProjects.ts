import { pageSchema, type Page } from './page';
import { SecuritySchemeWithProjectsSchema, type SecuritySchemeWithProjects } from './securitySchemeWithProjects';

export const PageSecuritySchemeWithProjectsSchema = pageSchema(SecuritySchemeWithProjectsSchema);

/**
 * @deprecated Use `Page<SecuritySchemeWithProjects>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageSecuritySchemeWithProjects = Page<SecuritySchemeWithProjects>;
