import { pageSchema, type Page } from './page';
import {
  ContextForProjectAndIssueTypeSchema,
  type ContextForProjectAndIssueType,
} from './contextForProjectAndIssueType';

export const PageContextForProjectAndIssueTypeSchema = pageSchema(ContextForProjectAndIssueTypeSchema);

/**
 * @deprecated Use `Page<ContextForProjectAndIssueType>`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export type PageContextForProjectAndIssueType = Page<ContextForProjectAndIssueType>;
