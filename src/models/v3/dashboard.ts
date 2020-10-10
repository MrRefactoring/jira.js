import { SharePermission } from './sharePermission';
import { UserBean } from './userBean';

export interface Dashboard {
  description: string;
  id: string;
  isFavourite: boolean;
  name: string;
  owner: UserBean[];
  popularity: number;
  rank: number;
  self: string;
  sharePermissions: SharePermission[];
  view: string;
}
