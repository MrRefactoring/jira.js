/** @deprecated Use UserMigration instead. */
export type UserMigrationBean = UserMigration;

export interface UserMigration {
  key?: string;
  username?: string;
  accountId?: string;
}
