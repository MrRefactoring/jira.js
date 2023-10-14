export interface GetAvatars {
  /** The avatar type. */
  type: 'project' | 'issuetype' | string;
  /** The ID of the item the avatar is associated with. */
  entityId: string;
}
