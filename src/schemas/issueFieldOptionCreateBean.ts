import { IssueFieldOptionConfiguration } from './issueFieldOptionConfiguration';

export interface IssueFieldOptionCreateBean {
    value: string;
    properties?: {
        [key: string]: any;
    };
    config?: IssueFieldOptionConfiguration[];
    [key: string]: unknown;
}
