import { pageSchema, type Page } from './page';
import { AssetsWorkspaceSchema, type AssetsWorkspace } from './assetsWorkspace';

export const PagedAssetsWorkspaceSchema = pageSchema(AssetsWorkspaceSchema);

/**
 * @deprecated Use `Page<AssetsWorkspace>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedAssetsWorkspace = Page<AssetsWorkspace>;
