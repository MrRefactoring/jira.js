import { Fields } from './fields';

export interface LinkedIssue {
    id: string;
    key: string;
    self: string;
    fields: Fields[];
}
