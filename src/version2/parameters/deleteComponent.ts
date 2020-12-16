export interface DeleteComponent {
  /** The ID of the component. */
  id: string;
  /** The ID of the component to replace the deleted component. If this value is null no replacement is made. */
  moveIssuesTo?: string;
}
