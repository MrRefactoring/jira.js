export interface RemoveGroup {
  /** The name of the group. */
  groupname: string;
  /** The group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. */
  swapGroup?: string;
}
