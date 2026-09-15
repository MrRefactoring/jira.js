import { pageSchema, type Page } from './page';
import { UserSchema, type User } from './user';

export const PageUserSchema = pageSchema(UserSchema);

/** @deprecated Use `Page<User>`, which describes the same shape. This alias is removed in the next major version. */
export type PageUser = Page<User>;
