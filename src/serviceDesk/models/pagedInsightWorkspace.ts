import { pageSchema, type Page } from './page';
import { InsightWorkspaceSchema, type InsightWorkspace } from './insightWorkspace';

export const PagedInsightWorkspaceSchema = pageSchema(InsightWorkspaceSchema);

/**
 * @deprecated Use `Page<InsightWorkspace>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedInsightWorkspace = Page<InsightWorkspace>;
