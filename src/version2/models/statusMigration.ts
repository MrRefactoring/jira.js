/** The mapping of old to new status ID. */
export interface StatusMigration {
  /** The new status ID. */
  newStatusReference: string;
  /** The old status ID. */
  oldStatusReference: string;
}
