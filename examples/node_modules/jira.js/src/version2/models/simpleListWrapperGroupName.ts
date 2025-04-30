import type { GroupName } from './groupName';
import type { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName';

export interface SimpleListWrapperGroupName {
  callback?: ListWrapperCallbackGroupName;
  items?: GroupName[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackGroupName;
  size?: number;
}
