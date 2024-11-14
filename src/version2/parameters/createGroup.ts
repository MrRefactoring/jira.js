import type { AddGroup } from '../models/index.js';

export interface CreateGroup extends AddGroup {
  [key: string]: any;
}
