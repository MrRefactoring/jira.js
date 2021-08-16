import { AddGroup } from '../models';

export interface CreateGroup extends AddGroup {
  [key: string]: any;
}
