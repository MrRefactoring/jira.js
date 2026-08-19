import { pageSchema, type Page } from './page';
import { RequestTypeSchema, type RequestType } from './requestType';

export const PagedRequestTypeSchema = pageSchema(RequestTypeSchema);

/** @deprecated Use `Page<RequestType>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedRequestType = Page<RequestType>;
