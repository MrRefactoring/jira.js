import { pageSchema, type Page } from './page';
import { ServiceDeskSchema, type ServiceDesk } from './serviceDesk';

export const PagedServiceDeskSchema = pageSchema(ServiceDeskSchema);

/** @deprecated Use `Page<ServiceDesk>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedServiceDesk = Page<ServiceDesk>;
