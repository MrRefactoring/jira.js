import { AddGroupBean } from '../models';

export interface CreateGroup extends AddGroupBean {
  [key: string]: any;
}
