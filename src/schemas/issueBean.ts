import { IncludedFields } from './includedFields';
import { IssueTransition } from './issueTransition';
import { IssueUpdateMetadata } from './issueUpdateMetadata';
import { Operations } from './operations';
import { PageOfChangelogs } from './pageOfChangelogs';

export interface IssueBean {
    expand: string;
    id: string;
    self: string;
    key: string;
    renderedFields: {
        [key: string]: any;
    };
    properties: {
        [key: string]: any;
    };
    names: {
        [key: string]: string;
    };
    schema: {
        [key: string]: any;
    };
    transitions: IssueTransition[];
    operations: Operations[];
    editmeta: IssueUpdateMetadata[];
    changelog: PageOfChangelogs[];
    versionedRepresentations: {
        [key: string]: any;
    };
    fieldsToInclude: IncludedFields[];
    fields: {
        [key: string]: any;
    };
}
