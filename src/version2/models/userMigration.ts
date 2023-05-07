/** @deprecated Use {@link UserMigration} instead. */
export type UserMigrationBean = UserMigration;

export interface UserMigration {
  accountId?: string;
  key?: string;
  username?: string;
}
