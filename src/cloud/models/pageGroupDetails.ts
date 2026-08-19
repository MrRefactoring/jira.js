import { pageSchema, type Page } from './page';
import { GroupDetailsSchema, type GroupDetails } from './groupDetails';

export const PageGroupDetailsSchema = pageSchema(GroupDetailsSchema);

/**
 * @deprecated Use `Page<GroupDetails>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageGroupDetails = Page<GroupDetails>;
