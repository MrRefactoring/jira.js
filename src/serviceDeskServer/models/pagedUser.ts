import { pageSchema, type Page } from './page';
import { UserSchema, type User } from './user';

export const PagedUserSchema = pageSchema(UserSchema);

/** @deprecated Use `Page<User>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedUser = Page<User>;
