import { pageSchema, type Page } from './page';
import { UserDetailsSchema, type UserDetails } from './userDetails';

export const PageUserDetailsSchema = pageSchema(UserDetailsSchema);

/** @deprecated Use `Page<UserDetails>`, which describes the same shape. This alias is removed in the next major version. */
export type PageUserDetails = Page<UserDetails>;
