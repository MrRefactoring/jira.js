import type { ApplicationRole } from './applicationRole';
import type { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole';

export interface SimpleListWrapperApplicationRole {
  size?: number;
  items?: ApplicationRole[];
  pagingCallback?: ListWrapperCallbackApplicationRole;
  callback?: ListWrapperCallbackApplicationRole;
  'max-results'?: number;
}
