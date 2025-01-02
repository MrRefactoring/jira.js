import type { GroupName } from './groupName.mjs';
import type { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName.mjs';

export interface SimpleListWrapperGroupName {
  size?: number;
  items?: GroupName[];
  pagingCallback?: ListWrapperCallbackGroupName;
  callback?: ListWrapperCallbackGroupName;
  'max-results'?: number;
}
