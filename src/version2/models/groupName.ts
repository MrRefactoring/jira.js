/** Details about a group. */
export interface GroupName {
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId?: string;
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
}
