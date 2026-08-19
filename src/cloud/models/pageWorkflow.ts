import { pageSchema, type Page } from './page';
import { WorkflowSchema, type Workflow } from './workflow';

export const PageWorkflowSchema = pageSchema(WorkflowSchema);

/** @deprecated Use `Page<Workflow>`, which describes the same shape. This alias is removed in the next major version. */
export type PageWorkflow = Page<Workflow>;
