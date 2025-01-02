export interface DeleteAvatar {
  /** The avatar type. */
  type: 'project' | 'issuetype' | string;
  /** The ID of the item the avatar is associated with. */
  owningObjectId: string;
  /** The ID of the avatar. */
  id: number;
}
