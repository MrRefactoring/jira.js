import type { ApplicationRole } from './applicationRole.js';
import type { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole.js';

export interface SimpleListWrapperApplicationRole {
  size?: number;
  items?: ApplicationRole[];
  pagingCallback?: ListWrapperCallbackApplicationRole;
  callback?: ListWrapperCallbackApplicationRole;
  'max-results'?: number;
}
