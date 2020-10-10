import { Scope } from './scope';

export interface Screen {
  id: number;
  name: string;
  description: string;
  scope: Scope[];
}
