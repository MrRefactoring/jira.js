import { pageSchema, type Page } from './page';
import { WorkflowSchemeSchema, type WorkflowScheme } from './workflowScheme';

export const PageWorkflowSchemeSchema = pageSchema(WorkflowSchemeSchema);

/**
 * @deprecated Use `Page<WorkflowScheme>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageWorkflowScheme = Page<WorkflowScheme>;
