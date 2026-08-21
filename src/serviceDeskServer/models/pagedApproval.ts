import { pageSchema, type Page } from './page';
import { ApprovalSchema, type Approval } from './approval';

export const PagedApprovalSchema = pageSchema(ApprovalSchema);

/** @deprecated Use `Page<Approval>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedApproval = Page<Approval>;
