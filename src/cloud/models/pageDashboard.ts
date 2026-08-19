import { pageSchema, type Page } from './page';
import { DashboardSchema, type Dashboard } from './dashboard';

export const PageDashboardSchema = pageSchema(DashboardSchema);

/** @deprecated Use `Page<Dashboard>`, which describes the same shape. This alias is removed in the next major version. */
export type PageDashboard = Page<Dashboard>;
