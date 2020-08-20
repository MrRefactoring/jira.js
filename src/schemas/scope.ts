import { ProjectForScope } from './projectForScope';

export interface Scope {
    type: string;
    project: ProjectForScope[];
    [key: string]: unknown;
}
