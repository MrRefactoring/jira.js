import { FieldConfigurationItem } from './fieldConfigurationItem';

/** @deprecated Use PageFieldConfigurationItem instead. */
export type PageBeanFieldConfigurationItem = PageFieldConfigurationItem;

/** A page of items. */
export interface PageFieldConfigurationItem {
  /** The URL of the page. */
  self?: string;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The list of items. */
  values?: FieldConfigurationItem[];
}
