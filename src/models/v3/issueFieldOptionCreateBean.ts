import { IssueFieldOptionConfiguration } from "./issueFieldOptionConfiguration";

export interface IssueFieldOptionCreateBean {
    value: string;
    properties?: {
        [key: string]: unknown;
    };
    config?: IssueFieldOptionConfiguration[];
    [key: string]: unknown;
}