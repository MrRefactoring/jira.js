/**
 * Details of context to project associations. */
export interface CustomFieldContextProjectMapping {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the project. */
  projectId?: string;
  /** Whether context is global. */
  isGlobalContext?: boolean;
}
