import type { ApplicationRole } from './applicationRole.mjs';
import type { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole.mjs';

export interface SimpleListWrapperApplicationRole {
  callback?: ListWrapperCallbackApplicationRole;
  items?: ApplicationRole[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackApplicationRole;
  size?: number;
}
