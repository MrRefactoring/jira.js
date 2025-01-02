import { AddGroup } from '../models/index.mjs';

export interface CreateGroup extends AddGroup {
  [key: string]: any;
}
