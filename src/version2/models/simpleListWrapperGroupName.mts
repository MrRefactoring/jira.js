import type { GroupName } from './groupName.mjs';
import type { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName.mjs';

export interface SimpleListWrapperGroupName {
  callback?: ListWrapperCallbackGroupName;
  items?: GroupName[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackGroupName;
  size?: number;
}
