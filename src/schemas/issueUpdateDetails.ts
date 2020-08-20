import { EntityProperty } from './entityProperty';
import { HistoryMetadata } from './historyMetadata';
import { IssueTransition } from './issueTransition';

export interface IssueUpdateDetails {
    transition: IssueTransition[];
    fields: {
        [key: string]: any;
    };
    update: {
        [key: string]: any;
    };
    historyMetadata: HistoryMetadata[];
    properties: EntityProperty[];
    [key: string]: unknown;
}
