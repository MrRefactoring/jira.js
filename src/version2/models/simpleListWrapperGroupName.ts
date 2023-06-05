import { GroupName } from './groupName';
import { ListWrapperCallbackGroupName } from './listWrapperCallbackGroupName';

export interface SimpleListWrapperGroupName {
  callback?: ListWrapperCallbackGroupName;
  items?: GroupName[];
  'max-results'?: number;
  pagingCallback?: ListWrapperCallbackGroupName;
  size?: number;
}
