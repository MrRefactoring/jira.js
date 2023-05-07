import { ApplicationRole } from './applicationRole';
import { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole';

export interface SimpleListWrapperApplicationRole {
  callback?: ListWrapperCallbackApplicationRole;
  items?: ApplicationRole[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackApplicationRole;
  size?: number;
}
