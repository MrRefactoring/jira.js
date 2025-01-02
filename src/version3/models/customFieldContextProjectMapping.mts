/** Details of a context to project association. */
export interface CustomFieldContextProjectMapping {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the project. */
  projectId?: string;
  /** Whether context is global. */
  isGlobalContext?: boolean;
}
