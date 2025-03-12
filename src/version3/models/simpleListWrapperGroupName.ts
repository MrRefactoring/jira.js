import type { GroupName } from './groupName';
import type { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName';

export interface SimpleListWrapperGroupName {
  size?: number;
  items?: GroupName[];
  pagingCallback?: ListWrapperCallbackGroupName;
  callback?: ListWrapperCallbackGroupName;
  'max-results'?: number;
}
