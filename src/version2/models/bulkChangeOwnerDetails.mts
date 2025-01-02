/** Details for changing owners of shareable entities */
export interface BulkChangeOwnerDetails {
  /** Whether the name is fixed automatically if it's duplicated after changing owner. */
  autofixName: boolean;
  /** The account id of the new owner. */
  newOwner: string;
}
