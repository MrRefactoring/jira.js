import { Icon } from './icon';

/** The status of the item. */
export interface Status {
  /**
   * Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font,
   * otherwise the link displays in normal font.
   */
  resolved?: boolean;
  icon?: Icon;
}
