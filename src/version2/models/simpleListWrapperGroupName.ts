import type { GroupName } from './groupName.js';
import type { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName.js';

export interface SimpleListWrapperGroupName {
  callback?: ListWrapperCallbackGroupName;
  items?: GroupName[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackGroupName;
  size?: number;
}
