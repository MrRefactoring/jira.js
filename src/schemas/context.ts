import { Scope } from './scope';

export interface Context {
    id: number;
    name: string;
    scope: Scope[];
}
