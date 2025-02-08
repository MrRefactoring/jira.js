import { FieldConfigurationDetails } from './fieldConfigurationDetails';

/**
 * Represents a page of items, typically used for paginated responses.
 *
 * @deprecated This interface is deprecated and will be removed in a future version. Use
 *   `Paginated<FieldConfigurationDetails>` instead, which is the preferred way to handle paginated responses for field
 *   configuration details.
 */
export interface PageBeanFieldConfigurationDetails {
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
  values?: FieldConfigurationDetails[];
}
