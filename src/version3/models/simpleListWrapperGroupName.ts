import type { GroupName } from './groupName.js';
import type { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName.js';

export interface SimpleListWrapperGroupName {
  size?: number;
  items?: GroupName[];
  pagingCallback?: ListWrapperCallbackGroupName;
  callback?: ListWrapperCallbackGroupName;
  'max-results'?: number;
}
