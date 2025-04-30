/** Details about an issue type. */
export interface IssueType {
  /** The URL of the issue type. */
  self: string;
  /** The unique identifier of the issue type. */
  id: string;
  /** The description of the issue type. */
  description: string;
  /** The URL of the icon for the issue type. */
  iconUrl: string;
  /** The name of the issue type. */
  name: string;
  /** Whether the issue type is a subtask type. */
  subtask: boolean;
  /** The ID of the avatar for the issue type. */
  avatarId: number;
  /** The ID of the entity for the issue type. */
  entityId: string;
  /** The hierarchy level of the issue type. */
  hierarchyLevel: number;
}
