import { FieldLastUsed } from './fieldLastUsed';
import { JsonType } from './jsonType';

/** Details of a field. */
export interface Field {
  /** The ID of the field. */
  id: string;
  /** The name of the field. */
  name: string;
  schema: JsonType;
  /** The description of the field. */
  description?: string;
  /** The key of the field. */
  key?: string;
  /** Whether the field is locked. */
  isLocked?: boolean;
  /** Whether the field is shown on screen or not. */
  isUnscreenable?: boolean;
  /** The searcher key of the field. Returned for custom fields. */
  searcherKey?: string;
  /** Number of screens where the field is used. */
  screensCount?: number;
  /** Number of contexts where the field is used. */
  contextsCount?: number;
  lastUsed?: FieldLastUsed;
}
