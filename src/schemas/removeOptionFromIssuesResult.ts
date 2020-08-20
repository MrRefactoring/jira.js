import { SimpleErrorCollection } from './simpleErrorCollection';

export interface RemoveOptionFromIssuesResult {
    modifiedIssues: number[];
    unmodifiedIssues: number[];
    errors: SimpleErrorCollection[];
}
