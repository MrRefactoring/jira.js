import { GroupName } from './groupName';
import { RestrictedPermission } from './restrictedPermission';

export interface NotificationRecipientsRestrictions {
  groups: GroupName[];
  permissions: RestrictedPermission[];
}
