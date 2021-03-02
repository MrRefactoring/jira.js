import { ApplicationRole } from './applicationRole';
import { ListWrapperCallbackApplicationRole } from './listWrapperCallbackApplicationRole';

export interface SimpleListWrapperApplicationRole {
  size?: number;
  items?: ApplicationRole[];
  pagingCallback?: ListWrapperCallbackApplicationRole;
  callback?: ListWrapperCallbackApplicationRole;
  'max-results'?: number;
}
