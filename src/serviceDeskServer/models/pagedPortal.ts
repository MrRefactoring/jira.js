import { pageSchema, type Page } from './page';
import { PortalSchema, type Portal } from './portal';

export const PagedPortalSchema = pageSchema(PortalSchema);

/** @deprecated Use `Page<Portal>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedPortal = Page<Portal>;
