import { ScreenTypes } from './screenTypes';
import { PageBeanIssueTypeScreenScheme } from './pageBeanIssueTypeScreenScheme';

/**
 * A screen scheme. */
export interface ScreenScheme {
  /** The ID of the screen scheme. */
  id?: number;
  /** The name of the screen scheme. */
  name?: string;
  /** The description of the screen scheme. */
  description?: string;
  /** The IDs of the screens for the screen types of the screen scheme. */
  screens?: ScreenTypes[];
  /** Details of the issue type screen schemes associated with the screen scheme. */
  issueTypeScreenSchemes?: PageBeanIssueTypeScreenScheme[];
}
