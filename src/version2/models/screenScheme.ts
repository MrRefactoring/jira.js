import type { PageIssueTypeScreenScheme } from './pageIssueTypeScreenScheme.js';
import type { ScreenTypes } from './screenTypes.js';

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
