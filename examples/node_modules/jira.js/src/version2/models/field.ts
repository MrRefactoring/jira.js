import type { FieldLastUsed } from './fieldLastUsed';
import type { JsonType } from './jsonType';

/** Details of a field. */
export interface Field {
  /** Number of contexts where the field is used. */
  contextsCount?: number;
  /** The description of the field. */
  description?: string;
  /** The ID of the field. */
  id: string;
  /** Whether the field is locked. */
  isLocked?: boolean;
  /** Whether the field is shown on screen or not. */
  isUnscreenable?: boolean;
  /** The key of the field. */
  key?: string;
  lastUsed?: FieldLastUsed;
  /** The name of the field. */
  name: string;
  /** Number of projects where the field is used. */
  projectsCount?: number;
  schema: JsonType;
  /** Number of screens where the field is used. */
  screensCount?: number;
  /** The searcher key of the field. Returned for custom fields. */
  searcherKey?: string;
}
