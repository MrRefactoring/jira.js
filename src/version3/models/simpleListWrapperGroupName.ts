import { GroupName } from './groupName';
import { ListWrapperCallbackGroupName, ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName';

export interface SimpleListWrapperGroupName {
  size?: number;
  items?: GroupName[];
  pagingCallback?: ListWrapperCallbackGroupName;
  callback?: ListWrapperCallbackGroupName;
  'max-results'?: number;
}
