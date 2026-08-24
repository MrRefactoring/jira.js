import { pageSchema, type Page } from './page';
import { RequestTypeGroupSchema, type RequestTypeGroup } from './requestTypeGroup';

export const PagedRequestTypeGroupSchema = pageSchema(RequestTypeGroupSchema);

/**
 * @deprecated Use `Page<RequestTypeGroup>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedRequestTypeGroup = Page<RequestTypeGroup>;
