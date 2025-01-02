import type { ApplicationRole } from './applicationRole.mjs';
import type { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole.mjs';

export interface SimpleListWrapperApplicationRole {
  size?: number;
  items?: ApplicationRole[];
  pagingCallback?: ListWrapperCallbackApplicationRole;
  callback?: ListWrapperCallbackApplicationRole;
  'max-results'?: number;
}
