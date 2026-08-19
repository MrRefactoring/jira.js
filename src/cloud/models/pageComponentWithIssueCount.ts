import { pageSchema, type Page } from './page';
import { ComponentWithIssueCountSchema, type ComponentWithIssueCount } from './componentWithIssueCount';

export const PageComponentWithIssueCountSchema = pageSchema(ComponentWithIssueCountSchema);

/**
 * @deprecated Use `Page<ComponentWithIssueCount>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageComponentWithIssueCount = Page<ComponentWithIssueCount>;
