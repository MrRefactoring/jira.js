import { pageSchema, type Page } from './page';
import { UserKeySchema, type UserKey } from './userKey';

export const PageUserKeySchema = pageSchema(UserKeySchema);

/** @deprecated Use `Page<UserKey>`, which describes the same shape. This alias is removed in the next major version. */
export type PageUserKey = Page<UserKey>;
