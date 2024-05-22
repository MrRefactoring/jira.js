import type { ApplicationRole } from './applicationRole.js';
import type { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole.js';

export interface SimpleListWrapperApplicationRole {
  callback?: ListWrapperCallbackApplicationRole;
  items?: ApplicationRole[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackApplicationRole;
  size?: number;
}
