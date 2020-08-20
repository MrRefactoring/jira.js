import { IdOrKeyBean } from './idOrKeyBean';
import { JexpIssues } from './jexpIssues';

export interface JiraExpressionEvalContextBean {
    issue: IdOrKeyBean[];
    issues: JexpIssues[];
    project: IdOrKeyBean[];
    sprint: number;
    board: number;
    serviceDesk: number;
    customerRequest: number;
}
