import type { PageIssueTypeScreenScheme } from './pageIssueTypeScreenScheme';
import type { ScreenTypes } from './screenTypes';

/** A screen scheme. */
export interface ScreenScheme {
  /** The description of the screen scheme. */
  description?: string;
  /** The ID of the screen scheme. */
  id?: number;
  issueTypeScreenSchemes?: PageIssueTypeScreenScheme;
  /** The name of the screen scheme. */
  name?: string;
  screens?: ScreenTypes;
}
